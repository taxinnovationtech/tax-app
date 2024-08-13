
import { Cnae } from "./cnae.type";
import { Tese } from "./tese.type";

export interface Segmento {
    id?: number,
    descricaoSegmento: string,
    cnaes?: Cnae[],
    teses_aplicaveis?: Tese[]
}