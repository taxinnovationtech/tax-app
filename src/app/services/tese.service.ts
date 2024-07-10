import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tese } from '../pages/baseteses/tese';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeseService {

  private readonly API = "https://api-chat.taxchatbot.click/teses";
  private readonly token!:string | null;
  private tokenType:string  = 'Bearer ';

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('euth-token');
   }

  listar(): Observable<Tese[]> {
      
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Tese[]>(this.API, {headers:headers})
  }

  cadastrar(tese: Tese): Observable<Tese>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Tese>(this.API, tese, {headers:headers})
  }

  atualizar(tese: Tese): Observable<Tese>{
    const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
    return this.http.post<Tese>(this.API + '/atualiza', tese, {headers:headers})
  }

  buscarPorId(id: number): Observable<Tese>{
      const headers = new HttpHeaders().set('Authorization', this.tokenType + this.token);
      return this.http.get<Tese>(this.API + '/' + id, {headers:headers})
  }
}
