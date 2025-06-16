import { CreateCodigoBarra } from "../codigoBarra/CreateCodigoBarra.interface";

export interface CreateProductoRequest {
    nombre: string;
    precio: number;
    cantidadEnStock: number;
    codigosBarras: CreateCodigoBarra[];
}