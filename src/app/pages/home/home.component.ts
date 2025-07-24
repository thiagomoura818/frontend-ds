import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Cliente } from '../../models/cliente';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cliente!: Cliente;
  saldoTotal!: number;

  constructor(private router: Router, private loginService: LoginService, private clienteService: ClienteService, private contaService : ContaService) {
    
  }

  ngOnInit(): void {
    const token = localStorage.getItem('Token'); 
    if (!token) {
      this.router.navigate(['']);
    }else{
      this.clienteService.listar().subscribe({
        next:(cliente) => this.cliente = cliente,
        error: (err) => console.log("Erro ao buscar cliente:", err)
      });
      this.calculaSaldo();
    }
  }

  sair(): void{
    this.loginService.limparToken();
    alert("Você está saindo!");
    this.router.navigate(['']);
  }

  irContas(): void{
    this.router.navigate(['conta']);
  }

  irDeposito(): void{
    this.router.navigate(['deposito']);

  }

  irSaque(): void{
    this.router.navigate(['saque']);

  }

  irPix(): void{
    this.router.navigate(['pix']);
  }

  irTransferencia(): void{
    this.router.navigate(['transferencia']);
  }

  irExtrato(): void{
    this.router.navigate(['extrato']);
  }

  irHistorico(): void{
    this.router.navigate(['historico']);
  }

  calculaSaldo(): void {
    this.contaService.listar().subscribe({
      next: (retornoJson) => {
        this.saldoTotal = 0;
        for (const conta of retornoJson) {
          this.saldoTotal += conta.saldo;
        }
        // Aqui você já atualizou this.saldoTotal e o Angular vai refletir no HTML
      },
      error: () => {
        throw new Error('Erro ao carregar a lista.');
      }
    });
  }
  
}
