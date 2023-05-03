import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Note } from 'src/app/Models/Note';
import { GLOBAL } from 'src/app/Services/Global';
import { Logout } from 'src/app/Services/Logout';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-owner',
    templateUrl: './notesowner.component.html',
    styleUrls: ['./notesowner.component.css']
})

export class NotesOwnerComponent {
    public title: string;
    public notes: Note[] = [];
    public searchId: string;
    public filteredNotes: Note[] = this.notes;
    public states: {id: number, nombre: string}[] = [
        {id: 1, nombre: 'Ingresado'},
        {id: 2, nombre: 'En proceso'},
        {id: 3, nombre: 'Finalizado'}
      ];
     public canCreate: boolean = false;
     public canUpdate: boolean = false;
     public canDelete: boolean = false;
     public canUser: boolean = false; 
     public canuserData: boolean = false;
     public canRol: boolean = false;
     
    
    
    constructor(private logout: Logout,private http: HttpClient) {
        this.title = 'Escritor';
        this.searchId = '';
        this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
        const scopes = JSON.parse(localStorage.getItem('scopes') || '[]');
        console.log('Scopes:', scopes); 
        if(scopes.length > 0){
            this.canCreate = scopes.includes('store');
            this.canUpdate = scopes.includes('update');
            this.canDelete = scopes.includes('destroy');
            this.canUser = scopes.includes('manage-rol-user');
            this.canuserData = scopes.includes('manage-account');
            this.canRol = scopes.includes('manage-rol-state');

    
            console.log(this.canCreate);
            console.log(this.canUpdate);
            console.log(this.canDelete);
            console.log(this.canUser);
            console.log(this.canuserData);
            console.log(this.canRol);

        }
    }

            ngOnInit(): void {
                this.getNotes().subscribe((notes) => { 
                  this.notes = notes;
                  this.filteredNotes = notes; // Actualiza las notas filtradas con las notas originales
                  console.log(notes); 
                });
              }
            
              getNotes(): Observable<any> { //obtener notas
                const httpOptions = {
                  headers: new HttpHeaders({
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  }),
                };
                // Usa el operador pipe y la función map para transformar la respuesta HTTP
                return this.http.get(GLOBAL.url + 'notes/', httpOptions).pipe(
                  map((response: any) => response.data)
                );
              }
              public searchNote(): void {
                // Verifica si el valor del input de búsqueda es vacío y, en ese caso, muestra todas las notas
                if (!this.searchId) {
                  this.filteredNotes = this.notes;
                  return;
                }
                // Filtra las notas según el título
                this.filteredNotes = this.notes.filter(n => n.titulo.toLowerCase().includes(this.searchId.toLowerCase()));
                if (this.filteredNotes.length > 0) {
                  // Encontró notas, reinicia el input de búsqueda
                  this.searchId = '';
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se encontró la nota que buscas',
                  });
                  this.searchId = '';
                  this.filteredNotes = this.notes;
                }
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

              deletenote(identificador: number): void {//eliminar nota
                const httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    })
                };
                      
                this.http.delete(GLOBAL.url + 'notes/' + identificador, httpOptions)
                    .subscribe(
                        (response: any) => {
                            console.log(response);
                            Swal.fire({
                                icon: 'success',
                                title: 'Note deleted successfully!',
                                text: 'Note with ID ' + identificador + ' has been deleted.',
                            });
                            // Actualizar la lista de notas después de eliminar una nota
                            this.getNotes().subscribe((notes) => { 
                                this.notes = notes;
                                this.filteredNotes = notes;
                            });
                        },
                        (error: any) => {
                            console.log(error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error deleting note!',
                                text: 'An error occurred while deleting the note with ID ' + identificador + '.',
                            });
                        }
                    );
            }
            
                  
              
            logoutUser() {//cerrar sesion
                this.logout.logout();
              }
}