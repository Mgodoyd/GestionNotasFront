import { Component } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { GLOBAL } from "../Services/Global";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { User } from "../Models/User";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {
     public  title : string;
    email: string;
    password: string;
    name: string;
    handleError: any;
    user: User;


        constructor(private http: HttpClient, private router: Router,){
            this.title = 'Register';
            this.email = '';
            this.password = '';
            this.name = '';
            this.user = new User(0, '', '', 0, 0, '');
        }

        onSubmit(): void { // Enviar el formulario
            if (!this.isValidForm()) {
                return;
            }
            console.log(`User: ${this.name}, Email: ${this.email}, Password: ${this.password}`);
            
            const formData = { name: this.name, email: this.email, password: this.password };
            console.log(formData);
        
            this.http.post<any>(GLOBAL.url + 'users', formData)
            .pipe(
              map((response) => {
                console.log(response);
                const token = response.data.token; // aquí se obtiene el token del objeto "data" dentro de la respuesta

                console.log('Token-verify:', token); // se muestra el token para verificar que haya sido recibido correctamente
                Swal.fire({
                  icon: 'success',
                  title: 'Bienvenido',
                  text: 'Registrado con éxito. Verifica tu cuenta.',
                  showCancelButton: true,
                  cancelButtonText: 'Después', 
                 cancelButtonColor: '#ff0000', 
                  confirmButtonText: 'Verificar', 
                }).then((result) => {
                  if (result.isConfirmed) { // Verifica si se ha hecho clic en el botón 
                    this.verifyEmail(token); // Llama a la función para verificar el correo electrónico
                  }
                });
                  
                return response;
              }),
              catchError((error: any) => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Error al registrarse.',
                });
                return throwError(error);
              })
            )
            .subscribe();
        }
        
        verifyEmail(token: string): void { // Verificar el correo electrónico
            
            this.http.get<any>(GLOBAL.url + 'users/verify/' + token )
              .subscribe((response) => {
                console.log(response);
                Swal.fire({
                  icon: 'success',
                  title: '¡Correo electrónico verificado con éxito!',
                  text: 'Puedes iniciar sesión en tu cuenta ahora.',
                }).then(() => {
                  this.router.navigate(['/']);
                });
              }, (error) => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: '¡Error al verificar el correo electrónico!',
                  text: 'Por favor, inténtalo de nuevo más tarde.',
                });
              });
          }
          

        private isValidForm(): boolean { // Comprobar si el formulario es válido
            return this.name !=='' && this.email !== '' && this.password !== '' ;
          } 
  }
 
  

  