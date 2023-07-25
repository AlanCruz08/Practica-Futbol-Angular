import { Component } from '@angular/core';
import { Division } from 'src/app/interface/secure'; // Importación de la interfaz Division desde 'src/app/interface/secure'
import { Router } from '@angular/router';
import { DivisionService } from 'src/app/services/Secure/division.service';

@Component({
  selector: 'app-create-division',
  templateUrl: './create-division.component.html',
  styleUrls: ['./create-division.component.css']
})
export class CreateDivisionComponent {

  divisiones: Division[] = new Array<Division>(); // Array que almacenará las divisiones
  division!: Division; // Variable para almacenar una única división

  constructor(
    private divisionService: DivisionService, // Servicio para manejar las operaciones de las divisiones
    private router: Router // Router para manejar la navegación dentro de la aplicación
  ) {}

  ngOnInit(): void {
    this.division = { // Inicialización de la variable division
      nivel: 0,
      liga: ''
    };
  }

  crearDivision() {
    const division: Division = { // Creación de un objeto Division con los datos actuales
      nivel: this.division.nivel,
      liga: this.division.liga
    };

    this.divisionService.createDivision(division).subscribe( // Llamada al método createDivision() del servicio divisionService
      response => {
        console.log('Division creada:', response); // Impresión del mensaje en la consola

        // Restablecer los campos del formulario trayendo los datos de la BD
        this.division.nivel = 0;
        this.division.liga = '';

        // Redirigir a la tabla de divisiones
        this.router.navigate(['/division']);
      },
      error => {
        console.error('Error al crear la division:', error); // Impresión del mensaje de error en la consola
      }
    );
  }

  cancelar() {
    // Restablecer los campos del formulario trayendo los datos de la BD
    this.division.nivel = 0;
    this.division.liga = '';

  }

  regresar(): void {
    window.history.back();
  }
}

