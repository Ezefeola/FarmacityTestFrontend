import { ApiPaginatedResponse } from "../../../../shared/interfaces/ApiPaginatedResponse.interface";
import { Producto } from "../producto/Producto.interface";

export interface GetProductsResponse extends ApiPaginatedResponse<Producto>{
    
}