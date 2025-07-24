import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Conta } from '../../models/conta';
import { Operacao } from '../../models/operacao';
import { ClienteService } from '../../services/cliente.service';
import { ContaService } from '../../services/conta.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css'
})
export class PixComponent {
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
    this.operacao.conta1 = formulario.contaOrigem.chavePix;
    this.operacao.conta2 = formulario.contaDestino
    this.operacao.valor = formulario.valor;

    this.service.pix(this.operacao).subscribe({
      next: () => {
        alert("Pix realizado com sucesso");
      },
      error: () => {
        alert("Erro ao realizar pix");
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
