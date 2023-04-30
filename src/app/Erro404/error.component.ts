import { Component } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})

export class ErrorComponent {
    public title: string;

    constructor() {
        this.title = 'Error 404!! Página no encontrada';
    }
}