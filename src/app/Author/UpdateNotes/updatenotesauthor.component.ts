import { Component } from '@angular/core';
import { Logout } from 'src/app/Services/Logout';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/Services/Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Note } from 'src/app/Models/Note';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'author-notesupdate',
    templateUrl: './updatenotesauthor.component.html',
    styleUrls: ['./updatenoteauthor.component.css']
})

export class NotesUpdateAuthorComponent {
    public title: string;
    public note: Note;
    public states: {id: number, nombre: string}[] = [
        {id: 1, nombre: 'Ingresado'},
        {id: 2, nombre: 'En proceso'},
        {id: 3, nombre: 'Finalizado'}
      ];
      public tituloInputValue: string;
      public contenidoTextareaValue: string;
      public estadoSelectValue: number;
      
      
    constructor(private logout: Logout, private route: ActivatedRoute, private http: HttpClient,private cd: ChangeDetectorRef) {
        this.note = new Note(0, '', '', 0, 0);
        this.title = 'Actualizar Nota';
        this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
        this.tituloInputValue = '';
        this.contenidoTextareaValue = '';
        this.estadoSelectValue = 0;
        }

        
        ngOnInit(): void {
            const title = this.route.snapshot.params['titulo'];
          //  console.log(title);
            this.getNoteByTitle(title).subscribe(
              (note: Note) => {
                this.note = note; // Guardar la nota obtenida en la propiedad note
                this.tituloInputValue = note.titulo; // Asignar el valor del input de título
                this.contenidoTextareaValue = note.descripcion; // Asignar el valor del textarea de contenido
                this.estadoSelectValue = note.Estatus; // Asignar el valor del select de estado id
              },
              (error: any) => {
                console.error('Error al obtener la nota', error);
              }
            );
              
          }
        
              private getNoteByTitle(title: string) {//obtener nota por titulo
                const httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }),
                };
                return this.http.get(GLOBAL.url + 'notes/'+ title, httpOptions).pipe(
                    map((response: any) => response.data)
                );
            }
            
            getStatusStyles(statusId: number) {//estilos de los estados
                switch(statusId) {
                  case 1:
                    return { backgroundColor: '#D0D0D0', color: 'black' };
                  case 2:
                    return { backgroundColor: '#4c80fc', color: 'white' };
                  case 3:
                    return { backgroundColor: '#13CD26', color: 'white' };
                  default:
                    return {};
                }
              }
            
              
              Updatenote() {//actualizar nota
                const httpOptions = {
                    headers: new HttpHeaders({
                      Authorization: 'Bearer ' + localStorage.getItem('token'),
                      'Content-Type': 'application/x-www-form-urlencoded'
                    })
                  };
                  
                  const body = new URLSearchParams();
                  body.set('title', this.tituloInputValue);
                  body.set('content', this.contenidoTextareaValue);
                  body.set('states_id', this.estadoSelectValue.toString());
                  body.set('user_id', localStorage.getItem('id') || '');
                  
                  this.http.put(GLOBAL.url + 'notes/' + this.note.identificador, body.toString(), httpOptions)
                    .subscribe(
                      (response: any) => {
                        console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Note updated successfully!',
                            text: this.tituloInputValue,
                          })
                      },
                        (error: any) => {
                            console.log(error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Se debe especificar al menos un campo diferente para actualizar la nota!',
                                    text: 'Para la nota:' + this.tituloInputValue,
                                });
                        }
                    );
                  
              }
              

                logoutUser() {//cerrar sesion
                    this.logout.logout();
                }
}
