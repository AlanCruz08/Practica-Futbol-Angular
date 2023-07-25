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
  division!: Division;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: DivisionService
  ) {}

  ngOnInit(): void {
    this.service.getDivisiones()
    .subscribe((data: any) => {
        this.divisiones = data.data;
        
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  eliminarDivision(id: number) {
    // Llamar al servicio para eliminar el futbolista por su ID
    this.service.deleteDivision(id).subscribe(
      (data: any) => {
        // Eliminación exitosa, realizar alguna acción si es necesario
        // Por ejemplo, volver a cargar los futbolistas después de la eliminación
        this.ngOnInit();
      },
      (error: any) => {
        // Manejar el error en caso de que falle la eliminación
        console.error(error);
      }
    );
  }

 
}
