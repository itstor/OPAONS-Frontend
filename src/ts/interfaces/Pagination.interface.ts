export interface NewPagingInterface<T> {
  docs: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  offset: number;
}

export interface OldPagingInterface<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
