import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Lancamento } from '../models/lancamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private apiUrl=`${appSettings.apiBaseUrl}/lancamento`
  constructor(private http: HttpClient, private loginService: LoginService) { }
  
  listar(id: number): Observable<Lancamento[]>{
    return this.http.get<Lancamento[]>(`${this.apiUrl}/cliente/${id}`, this.loginService.gerarCabecalhoHTTP());
  }
}
