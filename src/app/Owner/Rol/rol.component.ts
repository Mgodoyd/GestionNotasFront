import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Rol } from 'src/app/Models/Rol';
import { GLOBAL } from 'src/app/Services/Global';
import { Logout } from 'src/app/Services/Logout';

@Component({
    selector: 'app-owner',
    templateUrl: './rol.component.html',
    styleUrls: ['./rol.component.css']
})

export class RolComponent {
     public canCreate: boolean = false;
     public canUpdate: boolean = false;
     public canDelete: boolean = false;
     public canUser: boolean = false; 
     public canuserData: boolean = false;
     public canRol: boolean = false;
     public rol: Rol[] = [];
     filteredNotes: any;
     
    
    
    constructor(private logout: Logout,private http: HttpClient) {
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
              this.getRol().subscribe((rol) => { 
                  this.rol = rol;
                  this.filteredNotes = rol; // Actualiza las notas filtradas con las notas originales
                  console.log(rol); 
                });
            
            }
          
            getRol(): Observable<any> { //obtener los roles
              const httpOptions = {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                }),
              };
              // Usa el operador pipe y la función map para transformar la respuesta HTTP
              return this.http.get(GLOBAL.url + 'rols/', httpOptions).pipe(
                map((response: any) => response.data)
              );
            }
            
            getStatusStyles(statusId: number) { // Estilos para el estado de la nota
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

          
          logoutUser() {// Función para cerrar sesións
              this.logout.logout();
            }
    }