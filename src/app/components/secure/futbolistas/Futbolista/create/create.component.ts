import { Component } from '@angular/core';
import { FutbolistasService } from 'src/app/services/login/futbolistas/futbolista.service';
import { Futbolista } from 'src/app/interface/futbolista';
//importar el router
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  futbolistas: Futbolista[] = [];
  
  // Propiedades para los campos del formulario
  nombre!: string;
  ap_paterno!: string;
  ap_materno!: string;
  alias!: string;
  no_camiseta!: number;

  constructor(
    private futbolistasService: FutbolistasService,
    private router: Router
    ) { }

  crearJugador() {
    const jugador: Futbolista = {
      nombre: this.nombre,
      ap_paterno: this.ap_paterno,
      ap_materno: this.ap_materno,
      alias: this.alias,
      no_camiseta: this.no_camiseta
    };

    this.futbolistasService.createPersona(jugador).subscribe(
      response => {
        console.log('Jugador creado:', response);
        // Restablecer los campos del formulario trayendo los datos de la BD
        this.nombre = '';
        this.ap_paterno = '';
        this.ap_materno = '';
        this.alias = '';
        this.no_camiseta = 0;

        //rediridir a la tabla futbolistas
          this.router.navigate(['/futbolistas']);
      },
      error => {
        console.error('Error al crear jugador:', error);
      }
    );
  }
}
