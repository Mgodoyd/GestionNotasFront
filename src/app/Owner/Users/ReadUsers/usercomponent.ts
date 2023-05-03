import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/Models/User';
import { GLOBAL } from 'src/app/Services/Global';
import { Logout } from 'src/app/Services/Logout';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-usera',
    templateUrl: './usercomponent.html',
    styleUrls: ['./usercomponent.css']
})

export class UserComponent {
    public canCreate: boolean = false;
    public canUpdate: boolean = false;
    public canDelete: boolean = false;
    public canUser: boolean = false; 
    public canuserData: boolean = false;
    public canRol: boolean = false;
    public user: User[] = [];
   filteredNotes: any;
    public searchId: string;
    public OWNER_ROLE = 'Owner';
    public AUTHOR_ROLE = 'Author';
    public WRITER_ROLE = 'Writer';
    public READER_ROLE = 'Reader';
   

   
   
   constructor(private logout: Logout,private http: HttpClient) {
       this.logoutUser = this.logoutUser.bind(this);// Bind para que el this de logoutUser sea el de la clase
       this.searchId = '';
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
       this.getUser().subscribe((users) => { 
           this.user = users;
           this.filteredNotes = users; // Actualiza las notas filtradas con las notas originales
           console.log(users); 
         });  
     }
   
     getUser(): Observable<any> {
       const httpOptions = {
         headers: new HttpHeaders({
           Authorization: 'Bearer ' + localStorage.getItem('token'),
         }),
       };
       // Usa el operador pipe y la función map para transformar la respuesta HTTP
       return this.http.get(GLOBAL.url + 'users/', httpOptions).pipe(
         map((response: any) => response.data)
       );
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
   
     deleteUser(identificador: number): void {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            })
        };
              
        this.http.delete(GLOBAL.url + 'users/' + identificador, httpOptions)
            .subscribe(
                (response: any) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'User deleted successfully!',
                        text: 'User with ID ' + identificador + ' has been deleted.',
                    });
                    // Actualizar la lista de notas después de eliminar una nota
                    this.getUser().subscribe((user) => { 
                        this.user = user;
                        this.filteredNotes = user;
                    });
                },
                (error: any) => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error deleting user!',
                        text: 'No se puede eliminar por que el recurso esta relacionado con alguna nota',
                    });
                }
            );
    }

    
     public searchUser(): void {
        // Verifica si el valor del input de búsqueda es vacío y, en ese caso, muestra todas las notas
        if (!this.searchId) {
          this.filteredNotes = this.user;
          return;
        }
        // Filtra las notas según el título
        this.filteredNotes = this.user.filter(n => n.nombre.toLowerCase().includes(this.searchId.toLowerCase()));
        if (this.filteredNotes.length > 0) {
          // Encontró notas, reinicia el input de búsqueda
          this.searchId = '';
        } else {
          // No encontró notas, muestra un mensaje de error y reinicia el input de búsqueda
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el usuario que buscas',
          });
          this.searchId = '';
          this.filteredNotes = this.user;
        }
      }
    
    
   logoutUser() {
       this.logout.logout();
     }
   }