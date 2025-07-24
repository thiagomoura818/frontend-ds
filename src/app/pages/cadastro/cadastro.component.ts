import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  formGroup: FormGroup;
  objeto!: Cliente;

  constructor(private service : UsuarioService, private formBuilder : FormBuilder, private router : Router){
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required]],
      cpf: ['', Validators.required],
      telefone: [''],
      senha: ['', Validators.required]
    });

    
  }

  onSubmit(): void{

  const controls = this.formGroup.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      console.log(`Campo '${name}' está inválido`);
    }
  }

  if (!this.formGroup.valid) {
    this.formGroup.markAllAsTouched(); // força exibir erros no HTML
    return;
  }
    if(this.formGroup.valid){
      const formValue = this.formGroup.value;
      
      this.objeto = new Cliente();
      this.objeto.id = formValue.id;
      this.objeto.cpf = formValue.cpf;
      this.objeto.email = formValue.email;
      this.objeto.nome = formValue.nome;
      this.objeto.senha = formValue.senha;
      this.objeto.telefone = formValue.telefone;
     
      this.service.salvar(this.objeto).subscribe({
        next:() =>{
          alert("Cadastro realizado com sucesso");
          this.router.navigate(['']);
        },
        error:() =>{
          alert("Erro ao cadastrar usuário");
        }
      });
    }else{
    }
  }

  voltar(): void{
    this.router.navigate(['']);
  }
}
