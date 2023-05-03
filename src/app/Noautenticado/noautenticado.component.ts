import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
    selector: 'app-noautenticado',
    templateUrl: './noautenticado.component.html',
    styleUrls: ['./noautenticado.component.css']
})

export class NoautenticadoComponent {
      public title = 'No autenticado';
      constructor(private router: Router) { 
        }

        ngOnInit() {
            const token = localStorage.getItem('token'); // obtener el token guardado
            if (!token) {
              // no existe el token, redirigir al componente no autenticado
              this.router.navigate(['unauthorized']);
            } else {}
          }

}
    
