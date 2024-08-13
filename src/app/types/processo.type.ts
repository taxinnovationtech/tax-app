import { Tese } from "./tese.type";


export interface Processo {
    id?: number,
    numeroProcesso: string,
    caracteristicas: string,
    orgaoJulgador: string,
    autuado: string,
    classeJudicial: string,
    poloAtivo: string,
    poloPassivo: string,
    ultimaMovimentacao: string,
    tribunal: string,
    pedidoInicial: string,
    tese?: Tese
}