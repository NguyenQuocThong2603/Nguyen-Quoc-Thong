export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export interface PaginationOptions {
    pageNumber: number;
    pageSize: number;
    orderBy?: string;
    sortBy?: string;
}
