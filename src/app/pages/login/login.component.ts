
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Token } from '../../models/token';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formGroup: FormGroup;
  token: Token;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router){
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.token = new Token();
  }

  ngOnInit(): void{
    this.loginService.limparToken();
  }

  onSubmit(): void{
    if(this.formGroup.valid){
      const formValue = this.formGroup.value;

      this.loginService.autenticar(formValue.login, formValue.senha).subscribe({
        next: (resposta) => {
          this.token = resposta;
          this.loginService.salvarToken(this.token.accessToken);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Login ou senha inválidos');
        }
      })
    }
  }

  irParaCadastro(): void{
    this.router.navigate(['/cadastro']);
  }
}
