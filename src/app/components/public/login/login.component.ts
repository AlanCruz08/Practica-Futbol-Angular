import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Login } from 'src/app/interface/login';
import { ApiService as loginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  animations: [
    trigger('buttonError', [
      state('default', style({
        transform: 'translateX(0)',
      })),
      state('error', style({
        transform: 'translateY(10px)',
        backgroundColor: 'red'
      })),
      transition('default => error', [
        animate('500ms')
      ]),
      transition('error => default', [
        animate('500ms')
      ])
    ])
  ]
})
export class LoginComponent {

  login: Login = { email: '', password: '' };
  error: string | null;

  constructor(private loginService: loginService, private router: Router) {
    this.error = null;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al usuario a la página principal
      this.router.navigate(['/dashboard']);
    }
  }

  EnvioDatos() {
    if (this.login.email && this.login.password) {
      this.loginService.login(this.login).subscribe(
        (response: any) => {
          this.error = null;
          const token = response.access_token;
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          if (error && error.error && error.error.status === "error") {
            this.error = error.error.message;
          } else {
            this.error = 'Error desconocido';
          }
          setTimeout(() => {
            this.error = null; // Restablecer el valor a null para regresar al estado default
          }, 2000);
        }
      );
    } else {
      this.error = 'Por favor, verifica los campos.';
      setTimeout(() => {
        this.error = null; // Restablecer el valor a null para regresar al estado default
      }, 2000);
    }
  }

}
