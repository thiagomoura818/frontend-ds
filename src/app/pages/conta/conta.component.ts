import { Component } from '@angular/core';
import { Conta } from '../../models/conta';
import { ContaService } from '../../services/conta.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent {
  lista: Conta[] = [];
  conta!: Conta;
  cliente!: Cliente;
  //formGroup: FormGroup;

  formGroup2: FormGroup;
  formGroup3: FormGroup;

  constructor(private service: ContaService, private formBuilder: FormBuilder, private clienteService : ClienteService, private router : Router){
    this.formGroup2 = this.formBuilder.group({
      conta: [null, Validators.required],
      valor: ['', Validators.required],
    });

    this.formGroup3 = this.formBuilder.group({
      conta: [null, Validators.required],
      chave: ['', Validators.required],
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

  onSubmit1(): void{
    this.clienteService.listar().subscribe({
      next: (cliente) => {
        this.conta = new Conta();
        this.conta.clienteId = cliente.id; 
        this.service.salvar(this.conta).subscribe({
          next: ()=>{
            alert('Conta criada com sucesso');
            this.carregarLista();
          },
          error: ()=>{
            alert('Erro ao criar a conta!');
          }
        });  
      },
      error: () => {
        alert('Erro ao buscar o cliente!');
      }
    })
  }
 
  onSubmit2(): void{
    const formulario = this.formGroup2.value;
    
    this.service.cadastrarLimite(formulario.valor, formulario.conta).subscribe({
      next: () => {
        alert("Limite alterado com sucesso!");
        this.carregarLista();
      },
      error: () => {
        alert("Erro ao alterar o limite");
      }
    })
  }

  onSubmit3(): void{
    const formulario = this.formGroup3.value;
    
    this.service.cadastrarPix(formulario.chave, formulario.conta).subscribe({
      next: () => {
        alert("Chave pix alterado com sucesso!");
        this.carregarLista();
      },
      error: () => {
        alert("Erro ao alterar a chave pix");
      }
    })
  }

  voltar(): void{
    this.router.navigate(['home']);
  }
}
