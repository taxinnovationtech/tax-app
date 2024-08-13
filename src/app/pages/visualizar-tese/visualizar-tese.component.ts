import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FormsModule } from '@angular/forms';

import { TeseService } from '../../services/tese.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgIf } from '@angular/common';
import { Tese } from '../../types/tese.type';


@Component({
  selector: 'app-visualizar-tese',
  standalone: true,
  imports: [
    CabecalhoComponent,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgIf
  ],
  templateUrl: './visualizar-tese.component.html',
  styleUrl: './visualizar-tese.component.scss'
})
export class VisualizarTeseComponent implements OnInit{
  
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
  constructor(private service: TeseService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((tese) => {
      this.tese = tese;
    });
  }


  voltar(){
    this.router.navigate(['/baseteses'])
  }

}
