import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';

//owner
import { NotesComponent } from './Owner/Notes/Create/createnotes.component';

//reader
import { ReadNotesComponent } from './Reader/readnotescomponent';

//writer
import { ReadWirterComponent } from './Writer/ReadNote/noteswriter.component';

//error 404
import { ErrorComponent } from './Erro404/error.component';

//services
import { AuthGuard } from './Services/AuthGuard';
import { NoautenticadoComponent } from './Noautenticado/noautenticado.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login',component: LoginComponent},
  { path: 'register',component: RegisterComponent},
  { path: 'owner/notes',component: NotesComponent},
  //Lector
  { path: 'reader/notes',component: ReadNotesComponent,canActivate: [AuthGuard] },
  //Escritor
  { path: 'writer/notes',component: ReadWirterComponent,canActivate: [AuthGuard] },

  { path: 'unauthorized', component: NoautenticadoComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
