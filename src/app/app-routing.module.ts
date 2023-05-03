import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//login
import { LoginComponent } from './Login/login.component';
//register
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

//services
import { AuthGuard } from './Services/AuthGuard';
import { NoautenticadoComponent } from './Noautenticado/noautenticado.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login',component: LoginComponent},
  { path: 'register',component: RegisterComponent},
  //Lector
  { path: 'reader/notes',component: ReadNotesComponent,canActivate: [AuthGuard] },
  //Escritor
  { path: 'writer/notes',component: ReadWirterComponent,canActivate: [AuthGuard] },
  { path: 'update/:titulo',component: NotesUpdateComponent,canActivate: [AuthGuard]},
  //Autor
  { path: 'author/notes',component: ReadAuthorComponent,canActivate: [AuthGuard] },
  { path: 'updateauthor/:titulo',component: NotesUpdateAuthorComponent,canActivate: [AuthGuard]},
  { path: 'createauthor',component: CreateNotesAuthorComponent,canActivate: [AuthGuard]},
  //Owner
  { path: 'owner/notes',component: NotesOwnerComponent,canActivate: [AuthGuard] },
  { path: 'updateowner/:titulo',component: UpdateOwnerComponent,canActivate: [AuthGuard]},
  { path: 'createowner',component: CreateNotesOwnerComponent,canActivate: [AuthGuard]},
  { path: 'owner/rol',component: RolComponent,canActivate: [AuthGuard]},
  { path: 'owner/states',component: StatesComponent,canActivate: [AuthGuard]},
  { path: 'owner/users',component: UserComponent,canActivate: [AuthGuard]},
  { path: 'ownerupdateuser/:identificador',component: UpdateUserComponent,canActivate: [AuthGuard]},

  { path: 'unauthorized', component: NoautenticadoComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
