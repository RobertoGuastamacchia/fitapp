import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { GestioneClientiComponent } from './gestione-clienti/gestione-clienti.component';
import { GestioneSchedeComponent } from './gestione-schede/gestione-schede.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},    
    { path: '', component: LoginComponent},
    { path: 'signup', component: SignupComponent},  
    { path: 'servicepage', component: ServicePageComponent},  
    { path: 'home', component: HomeComponent},  
    { path: 'editUser', component: EditUserComponent},    
    { path: 'esercizi', component: EserciziComponent},     
    { path: 'gestioneclienti', component: GestioneClientiComponent}, 
    { path: 'gestioneschede/:id', component: GestioneSchedeComponent}, 
  ];
NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule],
    
  })