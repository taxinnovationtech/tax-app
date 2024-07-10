import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>("https://api-chat.taxchatbot.click/auth/login", {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("euth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
}
