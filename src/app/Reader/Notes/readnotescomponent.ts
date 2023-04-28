import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GLOBAL } from 'src/app/Services/Global';
import { Note } from 'src/app/Models/Note';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient) {
    this.title = 'Lector';
    this.searchId = '';
  }

  ngOnInit(): void {
    this.getNotes().subscribe((notes) => { 
      this.notes = notes;
      this.filteredNotes = notes; // Actualiza las notas filtradas con las notas originales
      console.log(notes); 
    });
  }

  getNotes(): Observable<any> {
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

  getDetails(note: Note) {
    Swal.fire({
      title: note.titulo,
      text: note.descripcion,
      width: 2200,
      padding: '2em',
      confirmButtonText: 'Cerrar'
    });
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
}