import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable()
export class Interceptor implements HttpInterceptor {

  public scopes: string[] = [];

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwt_decode(token) as any;
      if (tokenDecoded && tokenDecoded.hasOwnProperty('scopes')) {
        this.scopes = Array.isArray(tokenDecoded.scopes) ? tokenDecoded.scopes : tokenDecoded.scopes.split(' ');
        console.log('Scopes:', this.scopes);
      } else {
        console.log('Token sin scopes');
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
  

}