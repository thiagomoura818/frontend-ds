import { Component } from '@angular/core';
import { Historico } from '../../models/historico';
import { HistoricoService } from '../../services/historico.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  lista: Historico[] = [];
  cliente!: Cliente;

  constructor(private historicoService: HistoricoService, private router : Router, private clienteService: ClienteService) {}

  ngOnInit(){
    const token = localStorage.getItem('Token'); 
    if (!token) {
      this.router.navigate(['']);
    }else{
      this.clienteService.listar().subscribe({
        next:(cliente) => this.cliente = cliente,
        error: (err) => console.log("Erro ao buscar cliente:", err)
      });
      this.carregarLista();
    }
  }

  carregarLista(): void {
    this.historicoService.listar().subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }

  voltar(): void{
    this.router.navigate(['home']);
  }
}
