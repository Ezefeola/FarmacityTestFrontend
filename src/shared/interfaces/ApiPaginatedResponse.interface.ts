export interface ApiPaginatedResponse<TItems>
{
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    items: TItems[];
}