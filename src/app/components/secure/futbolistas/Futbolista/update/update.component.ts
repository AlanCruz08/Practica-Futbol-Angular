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
  futbolista: Futbolista | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private futbolistasService: FutbolistasService
  ) { }

  ngOnInit(): void {
    this.getFutbolistaById();
  }

  getFutbolistaById() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.futbolistasService.getFutbolistas(Number(id)).subscribe(
        (data: Futbolista) => {
          this.futbolista = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  editarFutbolista() {
    if (this.futbolista && this.futbolista.id !== undefined) {
      this.futbolistasService.updateFutbolista(this.futbolista.id, this.futbolista).subscribe(
        (data: any) => {
          // Redirigir a la lista de futbolistas o a la página de detalle del futbolista actualizado
          this.router.navigateByUrl('/futbolistas');
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      console.error("El futbolista no tiene un ID válido.");
    }
  }
  
}
