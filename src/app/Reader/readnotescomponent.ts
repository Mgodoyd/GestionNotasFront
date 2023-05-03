import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GLOBAL } from 'src/app/Services/Global';
import { Note } from 'src/app/Models/Note';
import Swal from 'sweetalert2';
import { Logout } from 'src/app/Services/Logout';

@Component({
  selector: 'app-readnotes',
  templateUrl: './readnotescomponent.html',
  styleUrls: ['./readnotescomponent.css']
})
export class ReadNotesComponent {
  public title: string;
  public notes: Note[] = [];
  public searchId: string;
  public filteredNotes: Note[] = this.notes;

  constructor(private http: HttpClient, private logout: Logout) {
    this.title = 'Lector';
    this.searchId = '';
    this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
  }

      ngOnInit(): void {
        this.getNotes().subscribe((notes) => { 
          this.notes = notes;
          this.filteredNotes = notes; // Actualiza las notas filtradas con las notas originales
          console.log(notes); 
        });
      }

          getNotes(): Observable<any> {// Obtener las notas
            const httpOptions = {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              }),
            };
            // Usa el operador pipe y la función map para transformar la respuesta HTTP
            return this.http.get(GLOBAL.url + 'notes', httpOptions).pipe(
              map((response: any) => response.data)
            );
          }

            getDetails(note: Note) {// Muestra los detalles de una nota
              Swal.fire({
                title: note.titulo,
                text: note.descripcion,
                width: 2200,
                padding: '2em',
                confirmButtonText: 'Cerrar'
              });
            }

                public searchNote(): void { // Buscar una nota
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
                    // No encontró notas, muestra un mensaje de error y reinicia el input de búsqueda
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'No se encontró la nota que buscas',
                    });
                    this.searchId = '';
                    this.filteredNotes = this.notes;
                  }
                }

            logoutUser() {// Cierra sesión
              this.logout.logout();
            }
}

