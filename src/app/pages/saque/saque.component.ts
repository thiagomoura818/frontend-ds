import { Component } from '@angular/core';
import { Conta } from '../../models/conta';
import { ContaService } from '../../services/conta.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Operacao } from '../../models/operacao';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-saque',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './saque.component.html',
  styleUrl: './saque.component.css'
})
export class SaqueComponent {
  lista: Conta[] = [];
  formGroup: FormGroup;
  operacao!: Operacao;
  cliente!: Cliente;


  constructor(private service: ContaService, private formBuilder: FormBuilder, private clienteService : ClienteService, private router : Router){
    this.formGroup = this.formBuilder.group({
          conta: [null, Validators.required],
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
    this.operacao.conta1 = formulario.conta.numero;
    this.operacao.valor = formulario.valor;

    this.service.sacar(this.operacao).subscribe({
      next: () => {
        alert("Saque realizado com sucesso");
      },
      error: () => {
        alert("Erro ao sacar dinheiro");
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
