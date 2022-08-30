import { CircularProgress, Typography } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Component, ForwardedRef, forwardRef } from 'react';
import toast from 'react-hot-toast';

import UserRankingTable from '@/components/table/UserRankingTable';

import SoalService from '@/services/Soal.service';
import TeamService from '@/services/Team.service';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { TableSortOrder, TableState } from '@/ts/interfaces/Table.interface';
import { TeamInterface } from '@/ts/interfaces/Team.interface';

class RankingTable extends Component<{ babak: number; kategori: string }, TableState<TeamInterface & DefaultResponseInterface>> {
  state: TableState<TeamInterface & DefaultResponseInterface> = {
    page: 1,
    rowsPerPage: 10,
    isLoading: false,
    count: 0,
    data: [],
    sortOrder: {
      name: 'scoreTotal_' + this.props.babak,
      direction: 'desc',
    },
    filter: [],
    columns: [
      {
        name: 'scoreTotal_' + this.props.babak,
        label: 'Ranking',
        options: {
          filter: false,
          sort: true,
          customBodyRender(value, tableMeta) {
            return tableMeta.tableState.rowsPerPage * tableMeta.tableState.page + tableMeta.rowIndex + 1;
          },
        },
      },
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
        name: 'phone',
        label: 'No. Telp',
        options: {
          filter: false,
          sort: false,
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
    ],
  };

  formatSortBy(sortOrder: TableSortOrder) {
    return sortOrder['name'] + ':' + sortOrder['direction'];
  }

  componentDidMount() {
    this.getData({ page: 0, limit: this.state.rowsPerPage, sortOrder: this.state.sortOrder });
  }

  async componentDidUpdate(prevProps: Readonly<{ babak: number; kategori: string }>) {
    if (prevProps.babak !== this.props.babak || prevProps.kategori !== this.props.kategori) {
      const sortBy = {
        name: 'scoreTotal_' + this.props.babak,
        direction: 'desc' as 'desc' | 'asc',
      };
      const column = this.state.columns;
      column[0].name = 'scoreTotal_' + this.props.babak;
      column[2].name = 'scoreTotal_' + this.props.babak;
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
          return <UserRankingTable ids={teamMember} babak={self.props.babak as 1 | 2} />;
        }

        return <div>Loading...</div>;
      },
    };
    return (
      <MUIDataTable
        title={
          <Typography variant='h5'>
            Ranking
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
export default forwardRef((props: { babak: number; kategori: string }, ref: ForwardedRef<any>) => <RankingTable {...props} ref={ref} />);
