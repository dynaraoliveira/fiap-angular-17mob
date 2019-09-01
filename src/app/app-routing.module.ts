import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListPage } from './pages/UserList/UserList.page';
import { UserPage } from './pages/User/User.page';
import { LoginPage } from './pages/Login/Login.page';
import { Route404Page } from './pages/Route404/Route404.page';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorized = redirectUnauthorizedTo(['login']);
const redirectAuthorized = redirectLoggedInTo([''])

const routes: Routes = [
  { path: '', component: UserListPage, ...canActivate(redirectUnauthorized) },
  { path: 'login', component: LoginPage, ...canActivate(redirectAuthorized) },
  { path: 'user', component: UserPage, ...canActivate(redirectUnauthorized) },
  { path: 'user/:id', component: UserPage, ...canActivate(redirectUnauthorized) },
  { path: '**', component: Route404Page }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
