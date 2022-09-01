import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { toNumber } from 'lodash';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import Router from 'next/router';
import { Component, ForwardedRef, forwardRef } from 'react';
import toast from 'react-hot-toast';

import FlatChip from '@/components/FlatChip';
import UserReviewTable from '@/components/table/UserReviewTable';

import SoalService from '@/services/Soal.service';
import TeamService from '@/services/Team.service';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { TableSortOrder, TableState } from '@/ts/interfaces/Table.interface';
import { TeamInterface } from '@/ts/interfaces/Team.interface';

class TeamReviewTable extends Component<{ babak: string; kategori: string }, TableState<TeamInterface & DefaultResponseInterface>> {
  state: TableState<TeamInterface & DefaultResponseInterface> = {
    page: 1,
    rowsPerPage: 10,
    isLoading: false,
    count: 0,
    data: [],
    sortOrder: {
      name: 'corrected',
      direction: 'desc',
    },
    filter: [],
    columns: [
      {
        name: 'name',
        label: 'Nama Tim',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: 'school',
        label: 'Asal Sekolah',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: 'email',
        label: 'Email',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: 'corrected',
        label: 'Terkoreksi?',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => {
            if (this.props.babak === '1') {
              return <FlatChip color='success' label='Sudah' />;
            }

            if (value >= 3) {
              return <FlatChip color='success' label='Sudah' />;
            } else {
              return <FlatChip color='error' label='Belum' />;
            }
          },
        },
      },
      {
        name: 'scoreTotal_' + this.props.babak,
        label: 'Skor',
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: 'name',
        label: 'Action',
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return (
              <div className='flex flex-row gap-2'>
                <Tooltip title='Koreksi'>
                  <IconButton
                    size='small'
                    onClick={() => {
                      Router.push(`/dashboard/review/${value}?babak=${this.props.babak}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
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

  async componentDidUpdate(prevProps: Readonly<{ babak: string; kategori: string }>) {
    if (prevProps.babak !== this.props.babak || prevProps.kategori !== this.props.kategori) {
      const sortBy = {
        name: 'scoreTotal_' + this.props.babak,
        direction: 'desc' as 'desc' | 'asc',
      };
      const column = this.state.columns;
      column[0].name = 'scoreTotal_' + this.props.babak;
      column[5].name = 'scoreTotal_' + this.props.babak;
      await this.setState({ sortOrder: sortBy, columns: column });
      this.getData({});
    }
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
        const { id } = data![index] as DefaultResponseInterface;
        await SoalService.deleteSoalById(id);
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

    TeamService.getAllTeams({
      sortBy,
      limit,
      page,
      schoolType: this.props.kategori.toUpperCase(),
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
      responsive: 'standard',
      rowsPerPageOptions: [5, 10, 25, 50, 100],
      selectableRows: 'none',
      filter: false,
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
      expandableRows: true,
      expandableRowsHeader: false,
      renderExpandableRow(rowData, rowMeta) {
        if (self.state.data) {
          const teamMember = self.state.data[rowMeta.dataIndex].membersId;
          const teamName = self.state.data[rowMeta.dataIndex].name;
          return <UserReviewTable ids={teamMember} teamName={teamName} babak={toNumber(self.props.babak) as 1 | 2} />;
        }

        return <div>Loading...</div>;
      },
    };
    return (
      <MUIDataTable
        title={
          <Typography variant='h5'>
            Jawaban Peserta
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
export default forwardRef((props: { babak: string; kategori: string }, ref: ForwardedRef<any>) => <TeamReviewTable {...props} ref={ref} />);
