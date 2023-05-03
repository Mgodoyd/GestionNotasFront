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

        onSubmit(): void {
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
                Swal.fire({
                  icon: 'success',
                  title: 'Bienvenido',
                  text: 'Registrado con éxito. Verifica  tu cuenta.',
                  footer: '<a>Click aqui</a>'
                });
          
                const token = response.token; // aquí se asigna el token a una variable adecuada
                console.log('Token-verify:', token); // se muestra el token para verificar que haya sido recibido correctamente

                this.user.identificador = response.identificador;
                this.user.nombre = response.nombre;
                this.user.correo = response.correo;
                this.user.rol = response.rol;
                this.user.es_verificado = response.es_verificado;
                this.user.token = response.token;
            
                console.log('User:', this.user); // mostramos los valores de la instancia User en la consola
                console.log('Token-verify:', this.user.token); // mostramos el token para verificar que haya sido recibido correctamente
                  
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
        
        verifyEmail(token: string): void {
            
            this.http.get<any>(`${GLOBAL.url}users/verify/${token}`)
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
          

        private isValidForm(): boolean {
            return this.name !=='' && this.email !== '' && this.password !== '' ;
          }
  }

  

  