import { MUIDataTableColumn } from 'mui-datatables';

export type TableSortOrder = { name: string; direction: 'desc' | 'asc' };

export type TableState = {
  page?: number;
  count?: number;
  rowsPerPage?: number;
  filter?: string[][];
  sortOrder?: TableSortOrder;
  data?: Array<object>;
  columns?: Array<MUIDataTableColumn>;
  isLoading?: boolean;
};

export interface TableProps<T> {
  page: number;
  count: number;
  rowsPerPage: number;
  filter: string[][];
  sortOrder: TableSortOrder;
  data: Array<T>;
  columns: Array<MUIDataTableColumn>;
  isLoading: boolean;
}
