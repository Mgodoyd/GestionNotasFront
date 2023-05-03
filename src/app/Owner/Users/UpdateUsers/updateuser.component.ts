import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { User } from "src/app/Models/User";
import { GLOBAL } from "src/app/Services/Global";
import { Logout } from "src/app/Services/Logout";
import Swal from "sweetalert2";

@Component({
    selector: 'app-updateuser',
    templateUrl: './updateuser.component.html',
    styleUrls: ['./updateuser.component.css']
})

export class UpdateUserComponent {
      public users: User;
      public rol:{id: number, nombre: string}[] = [
        {id: 1, nombre: 'Owner'},
        {id: 2, nombre: 'Author'},
        {id: 3, nombre: 'Writer'},
        {id: 4, nombre: 'Reader'}
        ];
      public tituloInputValue: string;
      public contenidoTextareaValue: string;
      public estadoSelectValue: number;
      public verifiedInputValue: number;
     
      
    constructor(private logout: Logout, private route: ActivatedRoute, private http: HttpClient,private cd: ChangeDetectorRef) {
        this.users = new User(0, '', '', 0, 0, '');
        this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
        this.tituloInputValue = '';
        this.contenidoTextareaValue = '';
        this.estadoSelectValue = 0;
        this.verifiedInputValue = 0;
        }

        
        
        ngOnInit(): void {
            const id = this.route.snapshot.params['identificador'];
          //  console.log(title);
            this.getUserById(id).subscribe(
              (users: User) => {
                this.users = users; // Guardar la nota obtenida en la propiedad note
                console.log(users);
                this.tituloInputValue = users.nombre // Asignar el valor del input de título
                this.verifiedInputValue = users.es_verificado // Asignar el valor del input de título
                this.contenidoTextareaValue = users.correo // Asignar el valor del textarea de contenido
                this.estadoSelectValue = users.rol // Asignar el valor del select de estado id
              },
              (error: any) => {
                console.error('Error al obtener la nota', error);
              }
            );
              
          }
          
          private getUserById(id: number) {
            const httpOptions = {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              }),
            };
            return this.http.get(GLOBAL.url + 'users/'+ id, httpOptions).pipe(
                map((response: any) => response.data)
            );
          }

          UpdateUser() {
            const httpOptions = {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/x-www-form-urlencoded'
                })
              };
              
              const body = new URLSearchParams();
              body.set('name', this.tituloInputValue);
              body.set('email', this.contenidoTextareaValue);
              body.set('rol_id', this.estadoSelectValue.toString());
              
              this.http.put(GLOBAL.url + 'users/' + this.users.identificador , body.toString(), httpOptions)
                .subscribe(
                  (response: any) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'User updated successfully!',
                        text: this.tituloInputValue,
                      })
                  },
                    (error: any) => {
                        console.log(error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Se debe especificar al menos un campo diferente para actualizar la nota!',
                                text: 'Para el user:' + this.tituloInputValue,
                            });
                    }
                );
              
          }
          
          isUserVerified() {
            return this.users && this.users.es_verificado;
          }
          

    logoutUser() {
        this.logout.logout();
      }
}
