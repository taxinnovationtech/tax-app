import { EmpresaPaginacao } from './../../types/empresaPaginacao.type';
import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Empresa } from '../../types/empresa.type';
import { EmpresaService } from '../../services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmpresaDTO } from '../../types/empresaDTO.type';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CabecalhoComponent,
    RouterLink,
    NgxSkeletonLoaderModule,
    NgxPaginationModule,
  ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit{

  listaEmpresas: EmpresaDTO[] = [];

  quantidadePaginas: number = 0;

  quantidadeItems: number = 0;

  p: number = 0;

  constructor(private service:EmpresaService, private toastService: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.listar(0);
  }

  listar(page: number): void {
    this.listaEmpresas = []; 
    this.service.listar(String(page-1), '20').subscribe((empresaPaginacao) => {
      console.log(empresaPaginacao);
      this.listaEmpresas = empresaPaginacao.empresas;
      this.quantidadePaginas = empresaPaginacao.totalPaginas;
      this.quantidadeItems = empresaPaginacao.totalItems;
      this.p = page;
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    })
  }
}
