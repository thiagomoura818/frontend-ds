import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${appSettings.apiBaseUrl}/auth/login`;


  constructor(private http: HttpClient) { }

  autenticar(login: string, senha: string):Observable<Token>{
    const objetoJS = {login, senha};
    return this.http.post<Token>(this.apiUrl, objetoJS);
  }

  salvarToken(token: string): void{
    localStorage.setItem("Token", token);
  }

  obterToken(): string{
    return localStorage.getItem("Token") || "";
  }

  limparToken(): void{
    localStorage.removeItem("Token");
  }

  extrairDadosToken(): any | null {
    const token = this.obterToken();
    if(!token) return null;

    try{
      const dadosToken = jwtDecode(token);
      return dadosToken;
    }catch(err){
      console.error('Token inválido', err);
      return null;
    }
  }

  gerarCabecalhoHTTP(){
    const token = this.obterToken();
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
  }
}
