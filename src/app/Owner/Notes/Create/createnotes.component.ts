import { Component } from '@angular/core';

@Component({
    selector: 'app-notes',
    templateUrl: './createnotes.component.html',
    styleUrls: ['./createnotes.component.css']
})

export class NotesComponent {
    public title: string;

    constructor() {
        this.title = 'Notes';
    }

    ngOnInit(): void {

    }

}