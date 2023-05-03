import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable()
export class Interceptor implements HttpInterceptor {

  public scopes: string[] = [];

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Recupera el token del local storage
        if (token) {
          const tokenDecoded = jwt_decode(token) as any; // Decodifica el token
          if (tokenDecoded && tokenDecoded.hasOwnProperty('scopes')) { // Si el token tiene scopes
            this.scopes = Array.isArray(tokenDecoded.scopes) ? tokenDecoded.scopes : tokenDecoded.scopes.split(' ');// Recupera los scopes del token
            console.log('Scopes:', this.scopes);
            localStorage.setItem('scopes', JSON.stringify(this.scopes));// Guarda los scopes en el local storage
          } else {
            console.log('Token sin scopes');
          }
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`// Añade el token a la cabecera de la petición
            }
          });
        }
        return next.handle(request);
  }
  

}