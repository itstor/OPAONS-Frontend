import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, IconButton, Switch, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import Router from 'next/router';
import { Component, ForwardedRef, forwardRef } from 'react';
import toast from 'react-hot-toast';

import KategoriSekolahChip from '@/components/KategoriSekolahChip';

import TeamService from '@/services/Team.service';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { TableSortOrder, TableState } from '@/ts/interfaces/Table.interface';
import { TeamInterface } from '@/ts/interfaces/Team.interface';

class TeamTable extends Component {
  state: TableState<TeamInterface & DefaultResponseInterface> = {
    page: 1,
    rowsPerPage: 5,
    isLoading: false,
    count: 0,
    data: [],
    sortOrder: {
      name: 'createdAt',
      direction: 'desc',
    },
    filter: [],
    columns: [
      {
        name: 'createdAt',
        label: 'Created',
        options: {
          filter: false,
          customBodyRender(value) {
            return moment(value).format('DD/MM/YYYY HH:mm');
          },
        },
      },
      {
        name: 'name',
        label: 'Nama Tim',
        options: {
          filter: false,
        },
      },
      {
        name: 'school',
        label: 'Asal Sekolah',
        options: {
          filter: false,
        },
      },
      {
        name: 'email',
        label: 'Email',
        options: {
          filter: false,
        },
      },
      {
        name: 'phone',
        label: 'No. Telp',
        options: {
          filter: false,
        },
      },
      {
        name: 'schoolType',
        label: 'Kategori',
        options: {
          filter: true,
          filterOptions: {
            names: ['SMA', 'SMK'],
          },
          customBodyRender(value) {
            return <KategoriSekolahChip kategori={value} />;
          },
        },
      },
      {
        name: 'pass',
        label: 'Lolos?',
        options: {
          filter: false,
          sort: true,
          customBodyRender(value, tableMeta, updateValue) {
            return (
              <Tooltip title='Toggle Lolos'>
                <Switch
                  checked={value}
                  onChange={() => {
                    const teamId = tableMeta.rowData[7];
                    TeamService.updateTeamById(teamId, { pass: !value })
                      .then(() => {
                        updateValue(!value as unknown as string);
                        toast.success('Berhasil mengubah status lolos');
                      })
                      .catch(() => {
                        toast.error('Gagal mengubah status lolos');
                      });
                  }}
                />
              </Tooltip>
            );
          },
        },
      },
      {
        name: '_id',
        label: 'Action',
        options: {
          filter: false,
          sort: false,

          customBodyRender(value) {
            return (
              <div className='flex flex-row gap-2'>
                <Tooltip title='Edit'>
                  <IconButton
                    size='small'
                    onClick={() => {
                      Router.push(`/dashboard/manage/tim/edit?id=${value}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
  };

  formatSortBy(sortOrder: TableSortOrder) {
    return sortOrder['name'] + ':' + sortOrder['direction'];
  }

  componentDidMount() {
    this.getData({ page: 0, limit: this.state.rowsPerPage, sortOrder: this.state.sortOrder });
  }

  async deleteMultipleData(rowsDeleted: {
    lookup: {
      [dataIndex: number]: boolean;
    };
    data: {
      index: number;
      dataIndex: number;
    }[];
  }) {
    this.setState({ isLoading: true });

    Promise.all(
      rowsDeleted.data.map(async (row) => {
        const { index } = row;
        const { data } = this.state;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { _id } = data![index] as DefaultResponseInterface;
        await TeamService.deleteTeamById(_id);
      })
    )
      .then(() => {
        toast.success('Data berhasil dihapus');
        this.getData({});
      })
      .catch(() => {
        toast.error('Data gagal dihapus');
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getData({ sortOrder, limit, page, filter }: { sortOrder?: TableSortOrder; limit?: number; page?: number; filter?: string[][] }) {
    this.setState({ isLoading: true });

    const sortBy = sortOrder
      ? this.formatSortBy(sortOrder)
      : this.formatSortBy(this.state.sortOrder ?? { direction: 'desc', name: 'createdAt' });

    page = page || this.state.page;
    limit = limit || this.state.rowsPerPage;
    const schoolType = filter ? filter[5][0] : undefined;

    TeamService.getAllTeams({
      sortBy,
      limit,
      page,
      schoolType,
    })
      .then((res) => {
        this.setState({
          data: res.data.docs,
          isLoading: false,
          count: res.data.totalDocs,
          page: page,
          rowsPerPage: limit,
          sortOrder: sortOrder || this.state.sortOrder,
          filter: filter || this.state.filter,
        });
      })
      .catch(() => {
        toast.error('Gagal mengambil data');
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { count, isLoading, rowsPerPage, sortOrder } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const options: MUIDataTableOptions = {
      count,
      rowsPerPage,
      sortOrder,
      elevation: 0,
      download: false,
      search: false,
      print: false,
      serverSide: true,
      rowsPerPageOptions: [5, 10, 25, 50, 100],
      onTableChange(action, tableState) {
        switch (action) {
          case 'changePage':
            self.getData({ page: tableState.page + 1 });
            break;
          case 'sort':
            self.getData({ sortOrder: tableState.sortOrder });
            break;
          case 'changeRowsPerPage':
            self.getData({ page: 1, limit: tableState.rowsPerPage });
            break;
          case 'filterChange':
            self.getData({ filter: tableState.filterList });
            break;
          default:
            break;
        }
      },
      onRowsDelete(rowsDeleted) {
        self.deleteMultipleData(rowsDeleted);
      },
    };
    return (
      <MUIDataTable
        title={
          <Typography variant='h5'>
            Daftar Tim
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
          </Typography>
        }
        data={this.state.data ?? []}
        columns={this.state.columns ?? []}
        options={options}
      />
    );
  }
}

export type TableTeamRef = {
  getData: (params: { sortOrder?: TableSortOrder; limit?: number; page?: number; filter?: string[][] }) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default forwardRef((props, ref: ForwardedRef<any>) => <TeamTable ref={ref} />);
