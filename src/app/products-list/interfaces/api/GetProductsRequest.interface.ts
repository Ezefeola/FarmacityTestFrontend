interface GetProductsRequest {
    Page?: number;
    PageSize?: number;

    SortColumn?: string; 
    SortDescending?: boolean;

    Nombre?: string;
    PrecioMin?: number;
    PrecioMax?: number;
}