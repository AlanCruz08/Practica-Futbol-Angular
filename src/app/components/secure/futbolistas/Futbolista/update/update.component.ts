import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FutbolistasService } from 'src/app/services/Secure/futbolista.service';
import { Futbolista } from 'src/app/interface/secure';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  futbolista!: Futbolista ; // Agrega una propiedad para almacenar el futbolista
  futbolistaId!: number; // Agrega una propiedad para almacenar el ID del futbolista

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FutbolistasService
    


  ) { }

  ngOnInit(): void {
    this.futbolista = {} as Futbolista;

    this.route.params.subscribe(params => {
      this.futbolistaId = +params['id']; // Obtenemos el ID del futbolista de la URL
      // Llamamos al servicio para obtener los detalles del futbolista por su ID
      this.service.getFutbolistas(this.futbolistaId).subscribe(
        (data: Futbolista) => {
          this.futbolista = data;
          console.log(data);
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

  cancelar() {
    // Redirigir a la lista de futbolistas sin guardar cambios
    this.router.navigateByUrl('/futbolistas');
  }
}
