import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conta } from '../../models/conta';
import { Operacao } from '../../models/operacao';
import { ClienteService } from '../../services/cliente.service';
import { ContaService } from '../../services/conta.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css'
})
export class TransferenciaComponent {
lista: Conta[] = [];
  formGroup: FormGroup;
  operacao!: Operacao;
  cliente!: Cliente;

  constructor(private service: ContaService, private formBuilder: FormBuilder, private clienteService : ClienteService, private router : Router){
    this.formGroup = this.formBuilder.group({
          contaOrigem: [null, Validators.required],
          contaDestino: ['',Validators.required],
          valor: ['', Validators.required],
        });
  }

  ngOnInit(): void{
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
  
  onSubmit(): void{
    const formulario = this.formGroup.value;
    this.operacao = new Operacao();
    this.operacao.conta1 = formulario.contaOrigem.numero;
    this.operacao.conta2 = formulario.contaDestino
    this.operacao.valor = formulario.valor;

    alert(this.operacao.conta1);
    alert(this.operacao.conta2);

    this.service.transferencia(this.operacao).subscribe({
      next: () => {
        alert("Transferencia realizada com sucesso");
      },
      error: () => {
        alert("Erro ao realizar transferencia");
      }
    })
  }

  carregarLista(): void{
    this.service.listar().subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson;
      },
      error:()=>{
        alert('Erro ao carregar a lista.');
      }
    })
  }

  voltar(): void{
    this.router.navigate(['home']);
  }
}
