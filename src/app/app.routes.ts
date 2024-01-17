import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},    
    { path: '', component: LoginComponent},
    
  ];
NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule],
    
  })