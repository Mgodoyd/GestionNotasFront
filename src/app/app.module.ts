import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
//owner
import { NotesComponent } from './Owner/Notes/Create/createnotes.component';

//reader
import { ReadNotesComponent } from './Reader/readnotescomponent';

//writer
import { ReadWirterComponent } from './Writer/ReadNote/noteswriter.component';
import { NotesUpdateComponent } from './Writer/UpdateNote/notesupdate.component';

//error 404
import { ErrorComponent } from './Erro404/error.component';


//interceptor
import { Interceptor } from './AuthService/Interceptor';

//services
import { NoautenticadoComponent } from './Noautenticado/noautenticado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotesComponent,
    ReadNotesComponent,
    ErrorComponent,
    NoautenticadoComponent,
    ReadWirterComponent,
    NotesUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClient,
    Interceptor,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
