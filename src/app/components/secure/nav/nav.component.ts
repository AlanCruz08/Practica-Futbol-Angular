import { Component } from '@angular/core';
import { ApiService as logoutService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  token = localStorage.getItem('token');
  error!: string | null;

  constructor(private logoutService: logoutService, private router: Router) { }

  cerrarSesion() {
    if (this.token !== null) {
      this.logoutService.logout({ token: this.token }).subscribe(
        (response: any) => {
          console.log(response);
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        },
        error => {
          console.log(this.error = error.error.msg);
          this.router.navigate(['/']);
        }
      );
    } else {
      console.log('como puedes hacer eso!')
      this.router.navigate(['/']);
    }
  }

}
