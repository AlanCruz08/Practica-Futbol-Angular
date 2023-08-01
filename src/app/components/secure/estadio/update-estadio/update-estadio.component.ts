import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estadio } from 'src/app/interface/secure';
import { EstadioService } from 'src/app/services/Secure/estadio.service';
import { FormsModule } from '@angular/forms'; // Importa el módulo FormsModule

@Component({
  selector: 'app-update-estadio',
  templateUrl: './update-estadio.component.html',
  styleUrls: ['./update-estadio.component.css']
})
export class UpdateEstadioComponent implements OnInit {
  estadio: Estadio = { nombre: '', pais: '', capacidad: 0 };
  estadioId: number = 0;

  constructor(
    private estadioService: EstadioService,
    private route: ActivatedRoute,
    private router: Router,
    private service: EstadioService,
  ) {}

  ngOnInit(): void {
    this.estadio = {} as Estadio;

    this.route.params.subscribe(params => {
      this.estadioId = +params['id']; // Obtenemos el ID del futbolista de la URL
      // Llamamos al servicio para obtener los detalles del futbolista por su ID
      this.service.getEstadio(this.estadioId).subscribe(
        (response: any) => {
          if (response.status === 200 && response.data) {
            this.estadio = response.data; // Accede a los datos dentro de la propiedad 'data'
            console.log(this.estadio);
          } else {
            // Manejar el caso en que no se encuentre el futbolista o la respuesta no sea la esperada
            console.error('Error al obtener los datos del estadio');
            this.router.navigateByUrl('/estadio');
          }
        },
        (error: any) => {
          console.error(error);
          // Si ocurre un error, puedes redirigir a la lista de futbolistas o mostrar un mensaje de error al usuario
          this.router.navigateByUrl('/estadio');
        }
        );
      });
    }
  


  cargarEstadio(): void {
    this.estadioService.getEstadio(this.estadioId).subscribe(
      (data: Estadio) => {
        this.estadio = data; // Asigna los datos recibidos a la propiedad estadio
        console.log(this.estadio); // Ahora debería mostrar los datos del estadio que se quiere editar
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  guardarCambios(): void {
    this.estadioService.updateEstadio(this.estadioId, this.estadio).subscribe(
      (data: Estadio) => {
        console.log('Estadio actualizado correctamente', data);
        this.router.navigate(['/estadio']);
      },
      (error: any) => {
        console.error('Error al actualizar el estadio', error);
      }
    );
  }

  cancelar(): void {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, redirigir al usuario a la página anterior
    this.router.navigate(['/estadio']);
  }
}
