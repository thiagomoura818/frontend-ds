import { Component } from '@angular/core';
import { Lancamento } from '../../models/lancamento';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LancamentoService } from '../../services/lancamento.service';
import { CommonModule } from '@angular/common';
import { Conta } from '../../models/conta';
import { ContaService } from '../../services/conta.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.css'
})
export class ExtratoComponent {
  lista: Lancamento[] = [];
  listaContas: Conta[] = [];
  formGroup : FormGroup;
  cliente!: Cliente;


  constructor(private contaService : ContaService, private lancamentoService : LancamentoService, private formBuilder : FormBuilder, private router : Router, private clienteService: ClienteService
  ){
      this.formGroup = this.formBuilder.group({
        conta: [null, Validators.required],      
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
    const formulario = this.formGroup.value.conta;

    this.lancamentoService.listar(formulario.id).subscribe({
      next: (lancamentos) => {
        this.lista = lancamentos.sort((a,b)=>b.id-a.id);
      },
      error: () => {
        alert("Erro ao carregar os lancamentos");
      }
    })
  }
  

  carregarLista(): void{
    this.contaService.listar().subscribe({
      next: (retornoJson) => {
        this.listaContas = retornoJson;
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
