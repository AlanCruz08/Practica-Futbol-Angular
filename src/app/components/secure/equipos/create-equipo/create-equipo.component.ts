import { Component } from '@angular/core';
import {  Equipo } from 'src/app/interface/secure'; // Importación de la interfaz Division desde 'src/app/interface/secure'
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/services/Secure/equipo.service';


@Component({
  selector: 'app-create-equipo',
  templateUrl: './create-equipo.component.html',
  styleUrls: ['./create-equipo.component.css']
})
export class CreateEquipoComponent {

  equipos: Equipo[] = new Array<Equipo>(); // Array que almacenará las divisiones
  equipo!: Equipo; // Variable para almacenar una única división

  constructor(
    private equipoService: EquipoService, // Servicio para manejar las operaciones de las divisiones
    private router: Router // Router para manejar la navegación dentro de la aplicación
  ) {}

  ngOnInit(): void {
    this.equipo = { // Inicialización de la variable division
      
      nombre: '',
      dir_deportivo: '',
      estadio_id: 0,
    };
  }

  crearEquipo() {
    const equipo: Equipo = { // Creación de un objeto Division con los datos actuales
      nombre: this.equipo.nombre,
      dir_deportivo: this.equipo.dir_deportivo,
      estadio_id: this.equipo.estadio_id,
    };

    this.equipoService.createEquipo(equipo).subscribe( // Llamada al método createDivision() del servicio divisionService
      response => {
        console.log('Equipo creado:', response); // Impresión del mensaje en la consola

        // Restablecer los campos del formulario trayendo los datos de la BD
        this.equipo.nombre = '';
        this.equipo.dir_deportivo = '';
        this.equipo.estadio_id = 0;

        // Redirigir a la tabla de divisiones
        this.router.navigate(['/equipos']);
      },
      error => {
        console.error('Error al crear el equipo:', error); // Impresión del mensaje de error en la consola
      }
    );
  }

  cancelar() {
    // Restablecer los campos del formulario trayendo los datos de la BD
    this.equipo.nombre = '';
        this.equipo.dir_deportivo = '';
        this.equipo.estadio_id = 0;


  }

  regresar(): void {
    window.history.back();
  }
}


