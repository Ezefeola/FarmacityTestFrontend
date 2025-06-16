import {type CodigoBarra } from "../codigoBarra/CodigoBarra.interface";

export interface Producto {
    productoId: number;
    nombre: string;
    precio: number;
    cantidadEnStock: number;
    activo: boolean;
    fechaAlta: string;
    fechaModificacion?: string;
    codigosBarras: CodigoBarra[];
}
