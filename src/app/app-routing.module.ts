import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SecuredPageComponent } from './pages/secured-page/secured-page.component';
import { LibraryComponent } from './pages/library/library.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'secured-page', component: SecuredPageComponent, canActivate:[AuthGuard]},
  { path:'library', component: LibraryComponent, canActivate:[AuthGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
