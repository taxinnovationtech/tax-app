
import { Cnae } from "./cnae.type";
import { Comercial } from "./comercial.type";
import { Processo } from "./processo.type";
import { Segmento } from "./segmento.type";
import { Tese } from "./tese.type";

export interface Empresa {
    id?: number,
    cnpj: string,
    razaoSocial: string,
    situacaoReceita: string,
    regimeTributacao: string,
    pesquisa: string,
    faturamentoAnual: number,
    folhaDePagamento: number,
    quantidadeFuncionarios: number,
    cnaePrincipal: string,
    percentualRecuperacao: number,
    qsa: any[],
    comercial?: Comercial,
    tesesAjuizadas: Tese[],
    segmento: Segmento,
    processos: Processo[]
}