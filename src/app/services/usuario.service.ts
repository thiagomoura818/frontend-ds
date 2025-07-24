import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${appSettings.apiBaseUrl}/usuarios`;
  
  constructor(private http: HttpClient) { }

  salvar(cliente : Cliente): Observable<Cliente>{
    if(!cliente.id){
      return this.http.post<Cliente>(this.apiUrl, cliente);
    }
    throw new Error('Atualização não implementada.');
  }
}
