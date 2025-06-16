import { CodigoBarra } from "../../products-list/interfaces/codigoBarra/CodigoBarra.interface";

export interface CodigoBarraUpdate extends Pick<CodigoBarra, "codigo">{
    codigoBarraId: number | null;
}