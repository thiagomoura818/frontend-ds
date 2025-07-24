import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${appSettings.apiBaseUrl}/cliente`;

  constructor(private http: HttpClient, private loginService : LoginService) { }

  listar(): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/listar/token`, this.loginService.gerarCabecalhoHTTP());
  }
}
