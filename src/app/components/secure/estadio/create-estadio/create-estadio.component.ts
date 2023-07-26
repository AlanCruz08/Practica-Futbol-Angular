import { Component } from '@angular/core';
import { Estadio } from 'src/app/interface/secure';
import { Router } from '@angular/router';
import { EstadioService } from 'src/app/services/Secure/estadio.service';

@Component({
  selector: 'app-create-estadio',
  templateUrl: './create-estadio.component.html',
  styleUrls: ['./create-estadio.component.css']
})
export class CreateEstadioComponent {

  estadios: Estadio[] = new Array<Estadio>(); // Array que almacenará los estadios
  estadio!: Estadio; // Variable para almacenar un unico estadio

  constructor(
    private estadioService: EstadioService, // Servicio para manejar las operaciones de los estadios
    private router: Router // Router para manejar la navegación dentro de la aplicación
  ) {}

  ngOnInit(): void {
    this.estadio = { // Inicialización de la variable estadio
      nombre: '',
      pais:'',
      capacidad:0
    };
  }

  crearEstadio() {
    const estadio: Estadio = { // Creación de un objeto Estadio con los datos actuales
      nombre: this.estadio.nombre,
      pais: this.estadio.pais,
      capacidad: this.estadio.capacidad
    };

    this.estadioService.createEstadio(estadio).subscribe( // Llamada al método createEstadio() del servicio estadioService
      response => {
        console.log('Estadio creado:', response); // Impresión del mensaje en la consola

        // Restablecer los campos del formulario trayendo los datos de la BD
        this.estadio.nombre = '';
        this.estadio.pais = '';
        this.estadio.capacidad = 0;

        // Redirigir a la tabla de divisiones
        this.router.navigate(['/estadio']);
      },
      error => {
        console.error('Error al crear el estadio:', error); // Impresión del mensaje de error en la consola
      }
    );
  }

  cancelar() {
    // Restablecer los campos del formulario trayendo los datos de la BD
    this.estadio.nombre = '';
    this.estadio.pais = '';
    this.estadio.capacidad = 0;


  }

  regresar(): void {
    window.history.back();
  }

}
