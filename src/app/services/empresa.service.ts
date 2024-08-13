import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../types/empresa.type';
import { Observable } from 'rxjs';
import { EmpresaPaginacao } from '../types/empresaPaginacao.type';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = "https://api-chat.taxchatbot.click/empresas";
  //private readonly API = "http://localhost:8081/empresas";
  private readonly token!:string | null;
  private tokenType:string  = 'Bearer ';

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('euth-token');
   }

  listar(page: string, size:string): Observable<EmpresaPaginacao> {
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<EmpresaPaginacao>(this.API + '?page=' + page + '&size=' + size, {headers:headers})
  }

  cadastrar(empresa: Empresa): Observable<Empresa>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Empresa>(this.API, empresa, {headers:headers})
  }

  atualizar(empresa: Empresa): Observable<Empresa>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Empresa>(this.API + '/atualiza', empresa, {headers:headers})
  }

  buscarPorId(id: number): Observable<Empresa>{
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Empresa>(this.API + '/' + id, {headers:headers})
  }

  buscarPorCnpj(cnpj: string): Observable<Empresa>{
    cnpj = cnpj.replaceAll('.', '');
    cnpj = cnpj.replaceAll('/', '');
    cnpj = cnpj.replaceAll('-', '');
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.get<Empresa>(this.API + '/cnpj/' + cnpj, {headers:headers})
}
}
