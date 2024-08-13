import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { Empresa } from '../../types/empresa.type';
import { Segmento } from '../../types/segmento.type';
import { Cnae } from '../../types/cnae.type';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { PropostaService } from '../../services/proposta.service';
import { Proposta } from '../../types/proposta.type';

@Component({
  selector: 'app-visualizar-empresa',
  standalone: true,
  imports: [
    CabecalhoComponent,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    NgIf,
    NgFor,
    NgxSkeletonLoaderModule,
    NgxPaginationModule
  ],
  templateUrl: './visualizar-empresa.component.html',
  styleUrl: './visualizar-empresa.component.scss'
})
export class VisualizarEmpresaComponent implements OnInit{

  listaCnaes: Cnae[] = [
     
  ];

  segmento: Segmento = {
    id: 0,
    descricaoSegmento: '',
    cnaes: this.listaCnaes,
    teses_aplicaveis: []
  }
  
  empresa: Empresa = {
    id: 0,
    cnpj: '',
    razaoSocial: '',
    situacaoReceita: '',
    regimeTributacao: '',
    pesquisa: '',
    faturamentoAnual: 0,
    folhaDePagamento: 0,
    quantidadeFuncionarios: 0,
    cnaePrincipal: '',
    percentualRecuperacao: 0,
    qsa: [],
    comercial: {
      nomeComercial: '',
      email: '',
    },
    tesesAjuizadas: [],
    segmento: this.segmento,
    processos: []
  };

  ultimaProposta: Proposta = {
    empresa: this.empresa,
    tesesOferecidas: []
  }

  totalProposta:number =  0;

  p: number = 1;
  pProcesso: number = 1;

  statusProposta:String = "NÃO FORAM LOCALIZADAS PROPOSTAS";

  constructor(private router:Router, private route: ActivatedRoute, private empresaService:EmpresaService, private propostaService: PropostaService) {

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.empresa.id = -1;

    this.empresaService.buscarPorId(parseInt(id!)).subscribe((empresa) => {
      
      this.empresa = empresa;

      this.statusProposta = "BUSCANDO PROPOSTAS...";
      
      this.propostaService.buscarPorEmpresa(this.empresa.id!).subscribe((propostas: Proposta[]) => {
        if (propostas.length > 0){
          this.ultimaProposta.tesesOferecidas = propostas.at(-1)?.tesesOferecidas!;
          this.ultimaProposta.tesesOferecidas.map(x => this.totalProposta += x.percentual);
        } else {
          this.statusProposta = "NÃO FORAM LOCALIZADAS PROPOSTAS";
        }
      })
    });
  }
}
