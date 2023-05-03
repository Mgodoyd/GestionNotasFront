import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Login
import { LoginComponent } from './Login/login.component';

//Register
import { RegisterComponent } from './Register/register.component';

//reader
import { ReadNotesComponent } from './Reader/readnotescomponent';

//writer
import { ReadWirterComponent } from './Writer/ReadNote/noteswriter.component';
import { NotesUpdateComponent } from './Writer/UpdateNote/notesupdate.component';

//author
import { ReadAuthorComponent } from './Author/Notes/notesauthor.component';
import { NotesUpdateAuthorComponent } from './Author/UpdateNotes/updatenotesauthor.component';
import { CreateNotesAuthorComponent } from './Author/CreateNotes/createnotesauthor.component';

//owner
import { NotesOwnerComponent } from './Owner/Notes/Read/notesowner.component';
import { UpdateOwnerComponent } from './Owner/Notes/Updatenotes/updateowner.component';
import { CreateNotesOwnerComponent } from './Owner/Notes/Create/createnotes.component';
import { RolComponent } from './Owner/Rol/rol.component';
import { StatesComponent} from './Owner/Estatus/states.component';
import { UserComponent } from './Owner/Users/ReadUsers/usercomponent';
import { UpdateUserComponent } from './Owner/Users/UpdateUsers/updateuser.component';

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
    ReadNotesComponent,
    ErrorComponent,
    NoautenticadoComponent,
    ReadWirterComponent,
    NotesUpdateComponent,
    ReadAuthorComponent,
    NotesUpdateAuthorComponent,
    CreateNotesAuthorComponent,
    NotesOwnerComponent,
    UpdateOwnerComponent,
    CreateNotesOwnerComponent,
    RolComponent,
    StatesComponent,
    UserComponent,
    UpdateUserComponent
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
