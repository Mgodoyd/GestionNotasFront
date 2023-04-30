import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Logout {


  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiraEn');
    // Redirigimos al usuario a la página de inicio de sesión
    this.router.navigate(['/']);
  }
}

/*  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiraEn');
    // Redirigimos al usuario a la página de inicio de sesión
    this.router.navigate(['/']);
  }*/