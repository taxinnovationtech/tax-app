import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proposta } from '../types/proposta.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  private readonly API = "https://api-chat.taxchatbot.click/propostas";
  private readonly token!:string | null;
  private tokenType:string  = 'Bearer ';

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('euth-token');
   }

  listar(): Observable<Proposta[]> {
      
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Proposta[]>(this.API, {headers:headers})
  }

  cadastrar(proposta: Proposta): Observable<Proposta>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Proposta>(this.API, proposta, {headers:headers})
  }

  atualizar(proposta: Proposta): Observable<Proposta>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Proposta>(this.API + '/addtese', proposta, {headers:headers})
  }

  buscarPorId(id: number): Observable<Proposta>{
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Proposta>(this.API + '/' + id, {headers:headers})
  }

  buscarPorEmpresa(idEmpresa: number): Observable<Proposta[]>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.get<Proposta[]>(this.API + '/empresaid/' + idEmpresa, {headers:headers})
}
}
