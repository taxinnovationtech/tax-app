
import { Comercial } from "./comercial.type";



export interface EmpresaDTO {
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
    comercial?: Comercial
}