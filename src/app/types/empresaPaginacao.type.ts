import { EmpresaDTO } from "./empresaDTO.type";


export interface EmpresaPaginacao {
    empresas: EmpresaDTO[],
    totalPaginas: number,
    totalItems: number
}