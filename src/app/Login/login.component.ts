import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import jwt_decode from 'jwt-decode';

import { GLOBAL } from '../Services/Global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public title: string;
  public email = '';
  public password = '';
  public rol = 0;
  public token = '';
  public id = 0;

        constructor(private http: HttpClient, private router: Router,) {
          this.title = 'Login';
        }

      
            onSubmit(): void {// Método que se ejecuta cuando se envía el formulario
              if (!this.isValidForm()) {
                console.log(`Email: ${this.email}, Password: ${this.password}`);
                return;
              }

              const formData = { email: this.email, password: this.password };

              this.http.post<any>(GLOBAL.url + 'api/login', formData)
                .pipe(
                  map((response) => {
                    // Extrae el rol del usuario de la respuesta
                    this.rol = response?.rol_id ?? 0;
                    this.id = response?.id ?? 0;
                    this.token = response?.access_token ?? '';

                    if (this.token) {
                      const expiraEn = new Date().getTime() + response.expires_in * 1000;
                      localStorage.setItem('token', this.token);
                      localStorage.setItem('expiraEn', expiraEn.valueOf().toString());
                    }
                    
                    localStorage.setItem('id', this.id.toString());
                 
                    
                    /* Decodifica el token para obtener la información del usuario
                   const decodedToken = jwt_decode(this.token);
                    console.log(decodedToken);*/

                  this.updateUserRole();
                  console.log(response);
                    return response;
                  }),
                  catchError(this.handleError.bind(this))
                )
                .subscribe();
            }

            private updateUserRole(): void { // Actualiza el rol del usuario

              const token = localStorage.getItem('token');
              if (token) {
                  // Si ya inició sesión, redirigirlo a la página de inicio
                  if (this.rol == 1) {  
                    this.router.navigate(['owner/notes']);
                    this.showWelcomeToast(1);
                  } else if (this.rol == 2) {
                    this.router.navigate(['author/notes']);
                    this.showWelcomeToast(2);
                  } else if (this.rol == 3) {
                    this.router.navigate(['writer/notes']);
                    this.showWelcomeToast(3);
                  } else if (this.rol == 4) {
                    this.router.navigate(['reader/notes']);
                    this.showWelcomeToast(4);
                  }
              
            } else {
                  // Si no ha iniciado sesión, redirigirlo a la página de inicio de sesión
                this.router.navigate(['/']);
              }
            }

            private showWelcomeToast(userRole: number): void {// Muestra un toast de bienvenida
              let title: string;
            
              switch (userRole) {
                case 1:
                  title = 'Bienvenido Owner';
                  break;
                case 2:
                  title = 'Bienvenido Author';
                  break;
                case 3:
                  title = 'Bienvenido Writer';
                  break;
                case 4:
                  title = 'Bienvenido Reader';
                  break;
                default:
                  return;
              }
            
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
            
              Toast.fire({
                icon: 'success',
                title
              })
            }

            private isValidForm(): boolean {// Valida que el formulario tenga datos
              return this.email !== '' && this.password !== '';
            }

            private handleError(error: any) {// Maneja los errores de la petición
              console.error('Error en la petición:', error);
            
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email or password incorrect!',
              })
              return [];
            }
}