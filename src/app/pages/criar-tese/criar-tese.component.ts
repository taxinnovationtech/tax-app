import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';

import { TeseService } from '../../services/tese.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tese } from '../../types/tese.type';

@Component({
  selector: 'app-criar-tese',
  standalone: true,
  imports: [
    CabecalhoComponent,
    FormsModule
  ],
  templateUrl: './criar-tese.component.html',
  styleUrl: './criar-tese.component.scss'
})
export class CriarTeseComponent implements OnInit{
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
    
  }

  criar() {
    this.service.cadastrar(this.tese).subscribe(() => {
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
