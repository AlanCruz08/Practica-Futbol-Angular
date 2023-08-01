import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FutbolistasService } from 'src/app/services/Secure/futbolista.service';
import { Futbolista } from 'src/app/interface/secure';
import { Observable } from 'rxjs';
import { EstadioService } from 'src/app/services/Secure/estadio.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  futbolista!: Futbolista; // Agrega una propiedad para almacenar el futbolista
  futbolistaId!: number; // Agrega una propiedad para almacenar el ID del futbolista
  estadios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FutbolistasService,
    private estadiosServ: EstadioService,
  ) { }

  ngOnInit(): void {
    this.getEstadios();
    this.futbolista = {} as Futbolista;

    this.route.params.subscribe(params => {
      this.futbolistaId = +params['id']; // Obtenemos el ID del futbolista de la URL
      // Llamamos al servicio para obtener los detalles del futbolista por su ID
      this.service.getFutbolistas(this.futbolistaId).subscribe(
        (response: any) => {
          if (response.status === 200 && response.data) {
            this.futbolista = response.data; // Accede a los datos dentro de la propiedad 'data'
            console.log(this.futbolista);
          } else {
            // Manejar el caso en que no se encuentre el futbolista o la respuesta no sea la esperada
            console.error('Error al obtener los datos del futbolista');
            this.router.navigateByUrl('/futbolistas');
          }
        },
        (error: any) => {
          console.error(error);
          // Si ocurre un error, puedes redirigir a la lista de futbolistas o mostrar un mensaje de error al usuario
          this.router.navigateByUrl('/futbolistas');
        }
      );
    });
  };


  guardarCambios() {
    // Llamamos al servicio para guardar los cambios del futbolista
    this.service.updateFutbolista(this.futbolistaId, this.futbolista).subscribe(
      (data: Futbolista) => {
        // Guardado exitoso, realizar alguna acción si es necesario
        // Por ejemplo, redirigir a la lista de futbolistas
        this.router.navigateByUrl('/futbolistas');
      },
      (error: any) => {
        // Manejar el error en caso de que falle el guardado
        console.error(error);
      }
    );
  }

  getEstadios(): Observable<any> {
    return this.estadiosServ.getEstadios();
  }
  cancelar() {
    // Redirigir a la lista de futbolistas sin guardar cambios
    this.router.navigateByUrl('/futbolistas');
  }
}
