import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { Conta } from '../models/conta';
import { Operacao } from '../models/operacao';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private apiUrl=`${appSettings.apiBaseUrl}/conta`
  constructor(private http: HttpClient, private loginService: LoginService) { }
  
  listar(): Observable<Conta[]>{
    return this.http.get<Conta[]>(`${this.apiUrl}/listar/cliente`, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(conta: Conta): Observable<Conta>{
    if(!conta.id){
      return this.http.post<Conta>(this.apiUrl, conta, this.loginService.gerarCabecalhoHTTP());
    }else{
      throw new Error('Atualização não implementada.');
    }
  }

  cadastrarLimite(limite: number, conta: Conta): Observable<Conta> {
    const url = `${this.apiUrl}/atualizarcredito/${conta.id}`;
    const params = new HttpParams().set('limiteCredito', limite.toString());
  
    const options = {
      headers: this.loginService.gerarCabecalhoHTTP().headers,
      params: params
    };
  
    return this.http.post<Conta>(url, null, options);
  }
  
  cadastrarPix(pix: string, conta: Conta): Observable<Conta> {
    const url = `${this.apiUrl}/cpix/${conta.id}`;
    const params = new HttpParams().set('chavePix', pix);
  
    const options = {
      headers: this.loginService.gerarCabecalhoHTTP().headers,
      params: params
    };
  
    return this.http.post<Conta>(url, null, options);
  }
  
  sacar(operacao: Operacao): Observable<Conta>{
    const url = `${this.apiUrl}/saque`;
    return this.http.post<Conta>(url, operacao, this.loginService.gerarCabecalhoHTTP());
  } 

  depositar(operacao: Operacao): Observable<Conta>{
    const url = `${this.apiUrl}/deposito`;
    return this.http.post<Conta>(url, operacao, this.loginService.gerarCabecalhoHTTP());
  } 

  transferencia(operacao: Operacao): Observable<Conta>{
    const url = `${this.apiUrl}/transferencia`;
    return this.http.post<Conta>(url, operacao, this.loginService.gerarCabecalhoHTTP());
  } 

  pix(operacao: Operacao): Observable<Conta>{
    const url = `${this.apiUrl}/pix`;
    return this.http.post<Conta>(url, operacao, this.loginService.gerarCabecalhoHTTP());
  } 
}
