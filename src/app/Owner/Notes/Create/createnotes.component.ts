import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Note } from 'src/app/Models/Note';
import { User } from 'src/app/Models/User';
import { GLOBAL } from 'src/app/Services/Global';
import { Logout } from 'src/app/Services/Logout';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-notes',
    templateUrl: './createnotes.component.html',
    styleUrls: ['./createnotes.component.css']
})

export class CreateNotesOwnerComponent {
    public canCreate: boolean = false;
    public canUpdate: boolean = false;
    public canDelete: boolean = false;
    public canUser: boolean = false; 
    public tituloInputValue: string;
    public contenidoTextareaValue: string;
    public userSelectValue: number;
    public note: Note;
    public user: User[]= [];

   constructor(private logout: Logout, private http: HttpClient) {
       this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
       this.tituloInputValue = '';
       this.contenidoTextareaValue = '';
       this.userSelectValue = 0;
       this.note = new Note(0, '', '', 0, 0);
   }

            ngOnInit(): void {
                forkJoin([
                    this.getUsersByRole(2),
                    this.getUsersByRole(3)
                ]).subscribe(
                    ([usersByRole2, usersByRole3]) => {
                        this.user = [...usersByRole2, ...usersByRole3];
                        console.log(this.user);
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }
            
            getUsersByRole(rol: number) {//obtener usuarios por rol
                const httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }),
                };
                return this.http.get(GLOBAL.url + 'rols/'+ rol + '/users', httpOptions).pipe(
                    map((response: any) => response.data)
                );
            }
            
            
            createnote() { //crear nota
                const httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                    };
                    
                    const body = new URLSearchParams();
                    body.set('title', this.tituloInputValue);
                    body.set('content', this.contenidoTextareaValue);
                    body.set('user_id', this.userSelectValue.toString());
                    
                    
                    this.http.post(GLOBAL.url + 'notes', body.toString(), httpOptions)
                    .subscribe(
                        (response: any) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Note created successfully!',
                            text: this.tituloInputValue,
                            })
                        },
                        (error: any) => {
                            console.log(error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al crear la nota',
                                    text: 'Para la nota:' + this.tituloInputValue,
                                });
                        }
                    );
                    
                }
                
            logoutUser() {//cerrar sesion
                this.logout.logout();
                }

}