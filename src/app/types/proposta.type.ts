
import { Empresa } from "./empresa.type";
import { Tese } from "./tese.type";

export interface Proposta {
    id?: number,
    empresa: Empresa,
    tesesOferecidas: Tese[]
}