import { Empresa } from './empresa.type';
import { Processo } from './processo.type';
export interface EmpresaProcessoDTO {
    empresa: Empresa,
    processo: Processo
}