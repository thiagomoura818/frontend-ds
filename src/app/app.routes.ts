import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ContaComponent } from './pages/conta/conta.component';
import { SaqueComponent } from './pages/saque/saque.component';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { PixComponent } from './pages/pix/pix.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HistoricoComponent } from './pages/historico/historico.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'conta', component: ContaComponent},
  { path: 'saque', component: SaqueComponent},
  { path: 'deposito', component: DepositoComponent},
  { path: 'pix', component: PixComponent},
  { path: 'transferencia', component: TransferenciaComponent},
  { path: 'extrato', component: ExtratoComponent},
  { path: 'historico', component: HistoricoComponent},
  { path: '', component: LoginComponent}
];
