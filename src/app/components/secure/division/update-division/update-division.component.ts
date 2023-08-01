import { Component } from '@angular/core';
import { Division } from 'src/app/interface/secure';
import { DivisionService } from 'src/app/services/Secure/division.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-division',
  templateUrl: './update-division.component.html',
  styleUrls: ['./update-division.component.css']
})
export class UpdateDivisionComponent {
  division: Division = { nivel: 0, liga: '' };
  divisionId: number = 0;

  constructor(
    private divisionService: DivisionService,
    private route: ActivatedRoute,
    private router: Router,
    private service: DivisionService,
  ) { }

  ngOnInit(): void {
    this.division = {} as Division;

    this.route.params.subscribe(params => {
      this.divisionId = +params['id']; // Obtenemos el ID del futbolista de la URL
      // Llamamos al servicio para obtener los detalles del futbolista por su ID
      this.service.getDivision(this.divisionId).subscribe(
        (response: any) => {
          if (response.status === 200 && response.data) {
            this.division = response.data; // Accede a los datos dentro de la propiedad 'data'
            console.log(this.division);
          } else {
            // Manejar el caso en que no se encuentre el futbolista o la respuesta no sea la esperada
            console.error('Error al obtener los datos del futbolista');
            this.router.navigateByUrl('/division');
          }
        },
        (error: any) => {
          console.error(error);
          // Si ocurre un error, puedes redirigir a la lista de futbolistas o mostrar un mensaje de error al usuario
          this.router.navigateByUrl('/division');
        }
      );
    });
  }

  cargarDivision(): void {
    this.divisionService.getDivision(this.divisionId).subscribe(
      (data: Division) => {
        this.division = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  guardarCambios(): void {
    this.divisionService.updateDivision(this.divisionId, this.division).subscribe(
      (data: Division) => {
        console.log('División actualizada correctamente', data);
        this.router.navigate(['/division']);
      },
      (error: any) => {
        console.error('Error al actualizar la división', error);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/division']);
  }
}
