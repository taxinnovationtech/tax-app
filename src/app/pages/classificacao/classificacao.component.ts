
import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../types/empresa.type';
import { FormsModule } from '@angular/forms';
import { Segmento } from '../../types/segmento.type';
import { Cnae } from '../../types/cnae.type';
import { NgFor, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { isEmpty } from 'rxjs';
import { Proposta } from '../../types/proposta.type';
import { PropostaService } from '../../services/proposta.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryTarget } from '@angular/compiler';
import { Tese } from '../../types/tese.type';

@Component({
  selector: 'app-classificacao',
  standalone: true,
  imports: [
    CabecalhoComponent,
    NgxMaskDirective, 
    NgxMaskPipe,
    FormsModule,
    NgIf,
    NgFor,
    NgxSkeletonLoaderModule,
    RouterLink
  ],
  providers: [
    ToastrService
  ],
  templateUrl: './classificacao.component.html',
  styleUrl: './classificacao.component.scss'
})
export class ClassificacaoComponent implements OnInit{
  
  listaCnaes: Cnae[] = [
     
  ];

  listaTesesAplicaveis: Tese[] = [
     
  ];

  listaTesesSelecionaveis: Tese[] = [

  ];

  listaTesesFinais: Tese[] = [

  ];

  segmento: Segmento = {
    id: 0,
    descricaoSegmento: '',
    cnaes: this.listaCnaes,
    teses_aplicaveis: this.listaTesesAplicaveis
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

  proposta: Proposta = {
    empresa: this.empresa,
    tesesOferecidas: this.listaTesesFinais
  }

  itematual: any;

  cnpj_aux: string | null = '';

  flag_busca_proposta: boolean = false;

  constructor(private service:EmpresaService, private propostaService:PropostaService, private router:Router, private toastService: ToastrService , private route: ActivatedRoute) {
  
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('euth-token') != null) {
      this.cnpj_aux = this.route.snapshot.paramMap.get('cnpj');

      if(this.cnpj_aux != null) {
        this.buscarPorCnpj(this.cnpj_aux!);
      }
    } else {
      this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
    }
  }



  buscarPorCnpj(cnpj: string){
    this.empresa.id = -1;

    this.service.buscarPorCnpj(cnpj).subscribe((empresa) => {
      
      if(empresa.id != null){
        this.empresa = empresa;

        this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.sort((a, b) => a.id! - b.id!);
        this.flag_busca_proposta = true;
        this.propostaService.buscarPorEmpresa(this.empresa.id!).subscribe((propostas: Proposta[]) => {

          if (propostas.length > 0) {
            this.listaTesesFinais = propostas.at(-1)?.tesesOferecidas!;
            
            this.listaTesesFinais.forEach((teseFinal) => {
              this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.filter((item) => item.id !== teseFinal.id);
            });
          }
          
          this.flag_busca_proposta = false;
        });
      } else {
        this.toastService.error("CNPJ não encontrado na base de dados.");
        this.empresa.id = 0;
      }
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    });

    

  }

  onDragStart(tese_aplicavel: Tese){
    this.itematual = tese_aplicavel;
  }

  onDrop(event: any, status:string) {
    event.preventDefault();
    
    if(status == 'Teses Aplicaveis') {
      this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.filter((item) => item !== this.itematual);
      this.empresa.segmento.teses_aplicaveis?.push(this.itematual);
      this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== this.itematual);
      this.listaTesesFinais = this.listaTesesFinais.filter((item) => item !== this.itematual);
      
      this.itematual = null;
      this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.sort((a, b) => a.id! - b.id!);

    } else if (status == 'Teses Selecionadas') {
      this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== this.itematual);
      this.listaTesesSelecionaveis.push(this.itematual);
      this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.filter((item) => item !== this.itematual);
      this.listaTesesFinais = this.listaTesesFinais.filter((item) => item !== this.itematual);
      this.itematual = null;
      this.listaTesesSelecionaveis = this.listaTesesSelecionaveis?.sort((a, b) => a.id! - b.id!);
    } else if (status == 'Teses Finais') {
      this.listaTesesFinais = this.listaTesesFinais.filter((item) => item !== this.itematual);
      this.listaTesesFinais.push(this.itematual);
      this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.filter((item) => item !== this.itematual);
      this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== this.itematual);
      this.itematual = null;
      this.listaTesesFinais = this.listaTesesFinais.sort((a, b) => a.id! - b.id!);
    }
  }

  onDragOver (event: any) {
    console.log('onDragOver');
    event.preventDefault();
  }

  aplicaveisParaSelecionaveis(tese: Tese) {
    this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== tese);
    this.listaTesesSelecionaveis.push(tese);
    this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.filter((item) => item !== tese);
    this.listaTesesSelecionaveis = this.listaTesesSelecionaveis?.sort((a, b) => a.id! - b.id!);
  }

  selecionaveisParaFinais(tese: Tese) {
    this.listaTesesFinais = this.listaTesesFinais.filter((item) => item !== tese);
    this.listaTesesFinais.push(tese);
    this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== tese);
    this.listaTesesFinais = this.listaTesesFinais.sort((a, b) => a.id! - b.id!);
  }

  finaisParaSelecionaveis(tese: Tese) {
    this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== tese);
    this.listaTesesSelecionaveis.push(tese);
    this.listaTesesFinais = this.listaTesesFinais.filter((item) => item !== tese);
    this.listaTesesSelecionaveis = this.listaTesesSelecionaveis?.sort((a, b) => a.id! - b.id!);
  }

  selecionaveisParaAplicaveis(tese: Tese) {
    this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.filter((item) => item !== tese);
    this.empresa.segmento.teses_aplicaveis?.push(tese);
    this.listaTesesSelecionaveis = this.listaTesesSelecionaveis.filter((item) => item !== tese);
    this.empresa.segmento.teses_aplicaveis = this.empresa.segmento.teses_aplicaveis?.sort((a, b) => a.id! - b.id!);
  }

  salvar() {
    this.proposta.empresa = this.empresa;
    this.proposta.tesesOferecidas = this.listaTesesFinais;
    this.propostaService.cadastrar(this.proposta).subscribe(() => {
      this.toastService.success("Proposta Registrada com sucesso!");
      setTimeout( () => { location.reload(); }, 1000);
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    });
  }

  limpar() {
    location.reload();
  }

}
