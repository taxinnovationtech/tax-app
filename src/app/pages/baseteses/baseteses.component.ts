import { TeseService } from './../../services/tese.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tese } from './tese';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


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

  constructor(private service:TeseService) {

  }


  ngOnInit(): void {
    this.service.listar().subscribe((listaTeses) => {
      this.listaTeses = listaTeses;
    })
  }

}
