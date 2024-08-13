import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {

}
