import { Component } from '@angular/core';
import { Division } from 'src/app/interface/secure';

import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { DivisionService } from 'src/app/services/Secure/division.service';

@Component({
  selector: 'app-create-division',
  templateUrl: './create-division.component.html',
  styleUrls: ['./create-division.component.css']
})
export class CreateDivisionComponent {

  divisiones: Division[] = new Array<Division>;
  division!: Division;
  
  
  constructor(
    private divisionService: DivisionService,
    private router: Router
    ) { }

    ngOnInit(): void {
    this.division = {
      nivel: 0,
      liga: '',
    }
  }

  crearDivision() {
    const division: Division = {
      nivel: this.division.nivel,
      liga: this.division.liga,
    };
  

    this.divisionService.createDivision(division).subscribe(
      response => {
        console.log('Division creada:', response);
        // Restablecer los campos del formulario trayendo los datos de la BD
        this.division.nivel = 0;
        this.division.liga = '';
        

        //rediridir a la tabla futbolistas
          this.router.navigate(['/division']);
      },
      error => {
        console.error('Error al crear la division:', error);
      }
    );
  }

}
