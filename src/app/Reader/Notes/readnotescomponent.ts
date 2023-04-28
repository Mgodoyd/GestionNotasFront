import { Component } from '@angular/core';

@Component({
    selector: 'app-readnotes',
    templateUrl: './readnotescomponent.html',
    styleUrls: ['./readnotescomponent.css']
})

export class ReadNotesComponent {
    public title: string;

    constructor() {
        this.title = 'Lector';
    }

    ngOnInit(): void {

    }

}