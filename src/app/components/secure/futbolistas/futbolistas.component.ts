import { Component, OnInit } from '@angular/core';
import { Futbolista } from 'src/app/interface/secure';
import { FutbolistasService } from 'src/app/services/Secure/futbolista.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-futbolistas',
  templateUrl: './futbolistas.component.html',
  styleUrls: ['./futbolistas.component.css']
})
export class FutbolistasComponent implements OnInit {
  futbolistas: Futbolista[] = [];
  futbolistasPaginados: Futbolista[] = [];
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginasTotales: number[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: FutbolistasService
  ) { }

  ngOnInit(): void {
    this.service.getFutbolista().subscribe(
      (data: any) => {
        this.futbolistas = data.data;
        this.calcularPaginasTotales();
        this.cambiarPagina(1);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  calcularPaginasTotales() {
    const totalPaginas = Math.ceil(this.futbolistas.length / this.itemsPorPagina);
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
    this.futbolistasPaginados = this.futbolistas.slice(inicio, fin);

    this.paginaActual = numPagina;
  }
}
