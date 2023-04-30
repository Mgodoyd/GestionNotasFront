import { Component } from '@angular/core';
import { GLOBAL } from 'src/app/Services/Global';
import { Note } from 'src/app/Models/Note';
import Swal from 'sweetalert2';
import { Logout } from 'src/app/Services/Logout';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Interceptor } from 'src/app/AuthService/Interceptor';

@Component({
    selector: 'writer-readnotes',
    templateUrl: './noteswriter.component.html',
    styleUrls: ['./noteswritercomponent.css']
})
export class ReadWirterComponent {
    public title: string;
    public notes: Note[] = [];
    public searchId: string;
    public filteredNotes: Note[] = this.notes;
    public states: {id: number, nombre: string}[] = [
        {id: 1, nombre: 'Ingresado'},
        {id: 2, nombre: 'En proceso'},
        {id: 3, nombre: 'Finalizado'}
      ];
     public canCreate: boolean;
     public canUpdate: boolean;
     public canDelete: boolean;
    
    constructor(private logout: Logout,private http: HttpClient, private interceptor: Interceptor) {
        this.title = 'Escritor';
        this.searchId = '';
        this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
        this.canCreate = this.interceptor.scopes.some(scope => scope.toLowerCase() === 'store');
        this.canUpdate = this.interceptor.scopes.some(scope => scope.toLowerCase() === 'update');
        this.canDelete = this.interceptor.scopes.some(scope => scope.toLowerCase() === 'destroy');
        console.log(this.canCreate);
        console.log(this.canUpdate);
        console.log(this.canDelete);
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

      getStatusStyles(statusId: number) {
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
      
    logoutUser() {
        this.logout.logout();
      }
    }

