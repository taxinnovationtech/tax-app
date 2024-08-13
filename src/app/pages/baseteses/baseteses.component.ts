import { TeseService } from './../../services/tese.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
import { Tese } from '../../types/tese.type';


@Component({
  selector: 'app-baseteses',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CabecalhoComponent,
    RouterLink,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './baseteses.component.html',
  styleUrl: './baseteses.component.scss'
})
export class BasetesesComponent implements OnInit{

  listaTeses: Tese[] = [
     
  ];

  constructor(private service:TeseService, private toastService: ToastrService, private router: Router) {

  }


  ngOnInit(): void {
    this.service.listar().subscribe((listaTeses) => {
      this.listaTeses = listaTeses;
    }, erro => {
      if (erro.status == 403) {
        this.toastService.error("Você precisa estar logado para acessar essas informações!!!");
      setTimeout( () => { this.router.navigate(['/login']); }, 1000);
      }
    })
  }

}
