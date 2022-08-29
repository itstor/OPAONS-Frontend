import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, IconButton, TableCell, Tooltip, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import Router from 'next/router';
import { Component, ForwardedRef, forwardRef } from 'react';
import toast from 'react-hot-toast';
import striptags from 'striptags';

import DifficultyChip from '@/components/DifficultyChip';
import TipeSoalChip from '@/components/KategoriSoalChip';
import SoalCard from '@/components/SoalCard';

import SoalService from '@/services/Soal.service';
import { PagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { Difficulty, PilganType, SoalInterface, TipeSoal } from '@/ts/interfaces/Soal.interface';
import { TableSortOrder, TableState } from '@/ts/interfaces/Table.interface';

class QuestionTable extends Component<{ babak: number; kategori: string }, TableState<SoalInterface & DefaultResponseInterface>> {
  state: TableState<SoalInterface & DefaultResponseInterface> = {
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
        name: 'question',
        label: 'Pertanyaan',
        options: {
          filter: false,
          setCellProps: () => ({
            style: {
              minWidth: '600px',
              maxWidth: '600px',
            },
          }),
          customBodyRender(value) {
            return <div className='max-h-4 overflow-hidden text-ellipsis'>{striptags(value)}</div>;
          },
        },
      },
      {
        name: 'type',
        label: 'Tipe Soal',
        options: {
          filter: true,
          filterOptions: {
            names: Object.keys(TipeSoal),
          },
          customBodyRender(value) {
            return <TipeSoalChip type={value} />;
          },
        },
      },
      {
        name: 'difficulty',
        label: 'Kesulitan',
        options: {
          filter: true,
          filterOptions: {
            names: Object.keys(Difficulty),
          },
          customBodyRender(value) {
            return <DifficultyChip difficulty={value} />;
          },
        },
      },
      {
        name: 'id',
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
                      Router.push(`/soal/edit?id=${value}`);
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

  componentDidUpdate(prevProps: Readonly<{ babak: number; kategori: string }>) {
    if (prevProps.babak !== this.props.babak || prevProps.kategori !== this.props.kategori) {
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
    const type = filter ? filter[2][0] : undefined;
    const difficulty = filter ? filter[3][0] : undefined;

    SoalService.getSoalAdmin({
      sortBy,
      limit,
      page,
      type,
      difficulty,
      school: this.props.kategori.toUpperCase(),
      round: this.props.babak,
    })
      .then((res: AxiosResponse<PagingInterface<SoalInterface & DefaultResponseInterface>>) => {
        this.setState({
          data: res.data.results,
          isLoading: false,
          count: res.data.totalResults,
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
      customToolbar() {
        return (
          <Tooltip title='Tambah Soal'>
            <IconButton
              size='small'
              style={{ padding: 12 }}
              className='hover:text-primary-700'
              onClick={() => Router.push(`/soal/tambah?babak=${self.props.babak}&kategori=${self.props.kategori}`)}
            >
              <FontAwesomeIcon icon={faPlus} fontSize='1rem' />
            </IconButton>
          </Tooltip>
        );
      },
      expandableRows: true,
      expandableRowsHeader: false,
      renderExpandableRow(rowData, rowMeta) {
        if (!self.state?.data) {
          return <>Cannot Load Question</>;
        }

        try {
          return (
            <TableCell colSpan={6}>
              <SoalCard
                question={self.state?.data[rowMeta.dataIndex].question}
                type={self.state?.data[rowMeta.dataIndex].type as keyof typeof TipeSoal}
                multipleChoice={self.state?.data[rowMeta.dataIndex].multipleChoice}
                correctAnswer={self.state?.data[rowMeta.dataIndex].answer as PilganType}
                selectedAnswer={self.state?.data[rowMeta.dataIndex].answer as PilganType}
                showCorrectAnswer={true}
              />
            </TableCell>
          );
        } catch (e) {
          return <>Cannot load question</>;
        }
      },
    };

    return (
      <MUIDataTable
        title={
          <Typography variant='h5'>
            List Soal
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
export default forwardRef((props: { babak: number; kategori: string }, ref: ForwardedRef<any>) => <QuestionTable {...props} ref={ref} />);
