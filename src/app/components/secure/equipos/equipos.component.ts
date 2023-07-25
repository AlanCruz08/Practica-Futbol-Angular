import { Component } from '@angular/core';
import { Equipo } from 'src/app/interface/secure';
import { EquipoService } from 'src/app/services/Secure/equipo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {
  equipos: Equipo[] = [];
  equiposPaginados: Equipo[] = [];
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginasTotales: number[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: EquipoService
  ) { }

  ngOnInit(): void {
    this.service.getEquipos().subscribe(
      (data: any) => {
        this.equipos = data.data;
        this.calcularPaginasTotales();
        this.cambiarPagina(1);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  calcularPaginasTotales() {
    const totalPaginas = Math.ceil(this.equipos.length / this.itemsPorPagina);
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
    this.equiposPaginados = this.equipos.slice(inicio, fin);

    this.paginaActual = numPagina;
  }

  eliminarEquipo(id: number) {
    // Llamar al servicio para eliminar el futbolista por su ID
    this.service.deleteEquipo(id).subscribe(
      (data: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        // Manejar el error en caso de que falle la eliminación
        console.error(error);
      }
    );
  }
}
