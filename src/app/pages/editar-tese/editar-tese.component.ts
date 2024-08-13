import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { TeseService } from '../../services/tese.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Tese } from '../../types/tese.type';

@Component({
  selector: 'app-editar-tese',
  standalone: true,
  imports: [
    CabecalhoComponent,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgIf
  ],
  providers: [
    ToastrService,
  ],
  templateUrl: './editar-tese.component.html',
  styleUrl: './editar-tese.component.scss'
})


export class EditarTeseComponent implements OnInit{

  tese: Tese = {
    id: 0,
    descricaoTese: '',
    tributo: '',
    modalidade: '',
    esfera: '',
    ap_financeiro: '',
    ap_industria: '',
    ap_comercio: '',
    ap_servico: '',
    resenha_sobre_acao: '',
    memoria_calculo: '',
    percentual: 0,
    stj: '',
    stf: '',
    tj: '',
    trf: '',
    carf_tit: '',
    modelo_ara: '',
    regimeTributacaoAplicavel: '',
    consolidacao: '',
    importante: '',
    nova_pergunta: '',
    validacao: '',
    sugestao_de_filtro: '',
    como_fica: ''
}
  constructor(private service: TeseService, private router:Router, private route: ActivatedRoute, private toastService: ToastrService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((tese) => {
      this.tese = tese;
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    });
  }

  editar() {
    this.service.atualizar(this.tese).subscribe(() => {
      this.router.navigate(['/baseteses'])
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    })
  }

  cancelar(){
    this.router.navigate(['/baseteses'])
  }
}
