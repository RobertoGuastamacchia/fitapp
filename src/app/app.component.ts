import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { User } from './classes/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fitapp';
  currentUser:User = new User();
  isLogged = false;
  isLoading = false;
  constructor(private _router: Router) {
    if(localStorage.getItem("user")){
      this.setIsLogged(true);
      var user = new User(JSON.parse(localStorage.getItem("user") as string));
      this.setCurrentUser(user);
    }
    else{
      this.changePage('login');
    }
  }

  changePage(page :string) { 
    this._router.navigate([page]);    
  }
  setCurrentUser(user:User){
    this.currentUser=user;
  }
  getCurrentUser(){
    return this.currentUser;
  }
  startLoading(){
    this.isLoading=true;
  }
  endLoading(){
    this.isLoading=false;
  }
  setIsLogged(logged:boolean){
    this.isLogged=logged;
  }
  getIsLogged(){
    return this.isLogged;
  }
  logOut(){
    this.currentUser=new User()
    this.isLogged=false;
    localStorage.removeItem("user");
    this.changePage('login');
  }
}

