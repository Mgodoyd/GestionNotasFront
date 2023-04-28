import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
//owner
import { NotesComponent } from './Owner/Notes/Create/createnotes.component';

//reader
import { ReadNotesComponent } from './Reader/Notes/readnotescomponent';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login',component: LoginComponent},
  { path: 'register',component: RegisterComponent},
  { path: 'owner/notes',component: NotesComponent},
  
  { path: 'reader/notes',component: ReadNotesComponent},
  
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
