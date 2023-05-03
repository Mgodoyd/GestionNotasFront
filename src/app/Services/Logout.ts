import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Logout {


  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiraEn');
    localStorage.removeItem('scopes');
    localStorage.removeItem('id');
    // Redirigimos al usuario a la página de inicio de sesión
    this.router.navigate(['/']);
  }
}