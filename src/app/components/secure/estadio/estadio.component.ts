import { Component } from '@angular/core';
import { Estadio } from 'src/app/interface/secure';
import { EstadioService } from 'src/app/services/Secure/estadio.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})
export class EstadioComponent {
  estadios: Estadio[] = [];
  estadiosPaginados: Estadio[] = [];
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginasTotales: number[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: EstadioService
  ) {}

  ngOnInit(): void {
    this.service.getEstadios()
    .subscribe((data: any) => {
        this.estadios = data.data;
        this.calcularPaginasTotales();
        this.cambiarPagina(1);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  calcularPaginasTotales() {
    const totalPaginas = Math.ceil(this.estadios.length / this.itemsPorPagina);
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
    this.estadiosPaginados = this.estadios.slice(inicio, fin);

    this.paginaActual = numPagina;
  }
}
