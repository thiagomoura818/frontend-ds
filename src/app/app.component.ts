import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxMaskDirective],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'guia12-app02';
}
