import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { Conta } from '../models/conta';
import { Historico } from '../models/historico';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private apiUrl=`${appSettings.apiBaseUrl}/historico`
  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Historico[]>{
      return this.http.get<Historico[]>(`${this.apiUrl}`, this.loginService.gerarCabecalhoHTTP());
  }
}
