import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/interface/secure';
import { EquipoService } from 'src/app/services/Secure/equipo.service';
import { EstadioService } from 'src/app/services/Secure/estadio.service'; // Importa el servicio de estadios

@Component({
  selector: 'app-update-equipo',
  templateUrl: './update-equipo.component.html',
  styleUrls: ['./update-equipo.component.css']
})
export class UpdateEquipoComponent implements OnInit {
  equipo: Equipo = { nombre: '', dir_deportivo: '', estadio: '' };
  equipoId: number = 0;

  estadios: any[] = []; // Agrega una propiedad para almacenar los estadios

  constructor(
    private equipoService: EquipoService,
    private estadioService: EstadioService, // Inyecta el servicio de estadios
    private route: ActivatedRoute,
    private router: Router,
    private service: EquipoService,
  ) { }

  ngOnInit(): void {
    this.equipo = {} as Equipo;

    this.route.params.subscribe(params => {
      this.equipoId = +params['id']; // Obtenemos el ID del futbolista de la URL
      // Llamamos al servicio para obtener los detalles del futbolista por su ID
      this.service.getEquipo(this.equipoId).subscribe(
        (response: any) => {
          if (response.status === 200 && response.data) {
            this.equipo = response.data; // Accede a los datos dentro de la propiedad 'data'
            console.log(this.equipo);
          } else {
            // Manejar el caso en que no se encuentre el futbolista o la respuesta no sea la esperada
            console.error('Error al obtener los datos del equipo');
            this.router.navigateByUrl('/equipos');
          }
        },
        (error: any) => {
          console.error(error);
          // Si ocurre un error, puedes redirigir a la lista de futbolistas o mostrar un mensaje de error al usuario
          this.router.navigateByUrl('/equipos');
        }
      );
    });

    this.getEstadios(); // Llama a la función para obtener los estadios al inicializar el componente
  }

  cargarEquipo(): void {
    this.equipoService.getEquipo(this.equipoId).subscribe(
      (data: Equipo) => {
        this.equipo = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // Agrega la función para obtener los estadios del servicio
  getEstadios() {
    this.estadioService.getEstadios().subscribe(
      (estadios) => {
        this.estadios = estadios;
      },
      (error) => {
        console.error('Error al obtener la lista de estadios:', error);
      }
    );
  }

  guardarCambios(): void {
    this.equipoService.updateEquipo(this.equipoId, this.equipo).subscribe(
      (data: Equipo) => {
        console.log('Equipo actualizado correctamente', data);
        this.router.navigate(['/equipos']);
      },
      (error: any) => {
        console.error('Error al actualizar el equipo', error);
      }
    );
  }

  cancelar(): void {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, redirigir al usuario a la página anterior
    this.router.navigate(['/equipos']);
  }
}