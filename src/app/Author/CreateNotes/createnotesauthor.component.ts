import { Component} from '@angular/core';
import { Note } from 'src/app/Models/Note';
import { Logout } from 'src/app/Services/Logout';
import { User } from 'src/app/Models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from 'src/app/Services/Global';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'author-createnotes',
    templateUrl: './createnotesauthor.component.html',
    styleUrls: ['./createnotesauthor.component.css']
})

export class CreateNotesAuthorComponent {
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
        this.getUsersByRole(3).subscribe(
            (response: User[]) => {
              this.user = response;
                console.log(this.user);
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      
        getUsersByRole(rol: number) {
            const httpOptions = {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }),
            };
            return this.http.get(GLOBAL.url + 'rols/'+ rol + '/users', httpOptions).pipe(
                map((response: any) => response.data)
            );
            }
  
    createnote() {
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
         
          
          this.http.post(GLOBAL.url + 'notes/', body.toString(), httpOptions)
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
      
    logoutUser() {
        this.logout.logout();
      }

}