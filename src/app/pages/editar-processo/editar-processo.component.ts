import { TeseService } from './../../services/tese.service';
import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { Processo } from '../../types/processo.type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProcessoService } from '../../services/processo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-processo',
  standalone: true,
  imports: [
    CabecalhoComponent,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgIf,
    RouterLink
  ],
  providers: [
    ToastrService
  ],
  templateUrl: './editar-processo.component.html',
  styleUrl: './editar-processo.component.scss'
})
export class EditarProcessoComponent implements OnInit{
  

  processo:Processo = {
    id: -1,
    numeroProcesso: '',
    caracteristicas: '',
    orgaoJulgador: '',
    autuado: '',
    classeJudicial: '',
    poloAtivo: '',
    poloPassivo: '',
    ultimaMovimentacao: '',
    tribunal: '',
    pedidoInicial: '',
    tese: {
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

  }

  flag_busca: boolean = false;

  cnpj: string | null = '';

  constructor(private processoService: ProcessoService, private teseService: TeseService, private router:Router, private toastService: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cnpj = this.route.snapshot.queryParamMap.get('cnpj');
    this.processoService.buscarPorId(parseInt(id!)).subscribe((processo) => {
      this.processo = processo;
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    });
  }

  buscarTese(idTese: string) {
    this.flag_busca = true;

    let id_tese_tratado = parseInt(idTese);

    this.teseService.buscarPorId(id_tese_tratado).subscribe((tese) => {
      this.processo.tese = tese;
      this.flag_busca = false;
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    });
  }

  editar() {
    this.processoService.atualizar(this.processo).subscribe(() => {
      this.router.navigate(['/classificacao/' + this.cnpj]);
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    })
  }

  cancelar(){
    this.router.navigate(['/classificacao/' + this.cnpj]);
  }
}
