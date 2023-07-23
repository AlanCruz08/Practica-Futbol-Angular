import { Component,OnInit } from '@angular/core';
import { Division } from 'src/app/interface/secure';
import { DivisionService } from 'src/app/services/Secure/division.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent {
  divisiones: Division[] = [];
  divisionesPaginados: Division[] = [];
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginasTotales: number[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: DivisionService
  ) {}

  ngOnInit(): void {
    this.service.getDivisiones()
    .subscribe((data: any) => {
        this.divisiones = data.data;
        this.calcularPaginasTotales();
        this.cambiarPagina(1);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  calcularPaginasTotales() {
    const totalPaginas = Math.ceil(this.divisiones.length / this.itemsPorPagina);
    this.paginasTotales = [];
    for (let i = 1; i <= totalPaginas; i++) {
      this.paginasTotales.push(i);
    }
  }

  cambiarPagina(numPagina: number) {
    if (numPagina < 1 || numPagina > this.paginasTotales.length) {
      return; // Evitar páginas inválidas
    }

    const inicio = (numPagina - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.divisionesPaginados = this.divisiones.slice(inicio, fin);

    this.paginaActual = numPagina;
  }
}
