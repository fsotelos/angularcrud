import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { RegisterUsersComponent } from './components/register-users/register-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'listUsers', pathMatch: 'full' },
  { path: 'listUsers', component: ListUsersComponent },
  { path: 'addUser', component: RegisterUsersComponent },
  { path: 'editUser/:id', component: RegisterUsersComponent },
  { path: '**', redirectTo: 'listUsers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
