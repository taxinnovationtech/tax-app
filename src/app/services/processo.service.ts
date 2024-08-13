import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../types/processo.type';

import { Observable, observeOn } from 'rxjs';
import { EmpresaProcessoDTO } from '../types/empresaprocessoDTO.type';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  private readonly API = "https://api-chat.taxchatbot.click/processos";
  private readonly token!:string | null;
  private tokenType:string  = 'Bearer ';

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('euth-token');
   }

  listar(): Observable<Processo[]> {
      
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Processo[]>(this.API, {headers:headers})
  }

  cadastrar(processo: Processo): Observable<Processo>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Processo>(this.API, processo, {headers:headers})
  }

  atualizar(processo: Processo): Observable<Processo>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Processo>(this.API + '/atualiza', processo, {headers:headers})
  }

  buscarPorId(id: number): Observable<Processo>{
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Processo>(this.API + '/' + id, {headers:headers})
  }

  buscarPorNumero(numeroProcesso: string): Observable<Processo>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.get<Processo>(this.API + '/num/' + numeroProcesso, {headers:headers})
}
}
