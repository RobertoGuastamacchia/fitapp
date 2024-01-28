import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Gym, User } from './classes/classes';
import * as bootstrap from "bootstrap";
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
  currentUserGym:Gym = new Gym();
  isLogged = false;
  message = "";
  isLoading = false;
  constructor(private _router: Router) {
    if(localStorage.getItem("user")){
      this.setIsLogged(true);
      var user = new User(JSON.parse(localStorage.getItem("user") as string));
      this.setCurrentUser(user);
      var gym = new Gym(JSON.parse(localStorage.getItem("gym") as string));
      this.setCurrentUserGym(gym);
      this.changePage('home');

    }
    else{
      this.changePage('login');
    }
  }

  showAlert(message:string){
    this.message=message;
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample!)
    toastBootstrap.show()    
  }

  changePage(page :string) { 
    this._router.navigate([page]);
    window.scrollTo(0, 0);
  }
  setCurrentUser(user:User){
    this.currentUser=user;
  }
  getCurrentUser(){
    return this.currentUser;
  }
  setCurrentUserGym(gym:Gym){
    this.currentUserGym=gym;
  }
  getCurrentUserGym(){
    return this.currentUserGym;
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

