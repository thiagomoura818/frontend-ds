import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/tipo';
import { NgxMaskDirective } from 'ngx-mask';
import { Router, ActivatedRoute,  RouterModule} from '@angular/router';

@Component({
  selector: 'app-add-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './add-produto.component.html',
  styleUrl: './add-produto.component.css'
})
export class AddProdutoComponent {

  formGroup: FormGroup;
  listaTipos: Tipo[] = [];

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private route: ActivatedRoute, private router: Router, private tipoService: TipoService) {

    this.formGroup = this.formBuilder.group({
      id: [null],
      descricao: ['', Validators.required],
      valor: [null, Validators.required],
      estoque: [, Validators.required],
      tipo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarListaTipo();

    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {     
      this.produtoService.buscarPorId(id).subscribe(retorno => {        
        let tipoSelecionado = this.listaTipos.find(temp => temp.id === retorno.tipo!.id);
        this.formGroup.patchValue({
          descricao: retorno.descricao,
          valor: retorno.valor,
          estoque: retorno.estoque,
          tipo: tipoSelecionado
        });
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.produtoService.salvar(this.formGroup.value).subscribe({
        next: () => {
          alert('Registro salvo com sucesso!');
          this.formGroup.reset();
          this.router.navigate(['/produtos']);
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });
    }
  }

  carregarListaTipo(): void {
    this.tipoService.listar().subscribe({
      next: (retornoJson) => {
        this.listaTipos = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }

}
