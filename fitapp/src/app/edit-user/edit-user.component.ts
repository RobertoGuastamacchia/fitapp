import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Gym, User } from '../classes/user';
import { APIModule } from '../api/api.module';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule,CommonModule,APIModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user:User = new User()
  gym:Gym = new Gym()
  root:any
  api:any
  constructor(_root:AppComponent,_api:APIModule){
    this.root=_root;
    this.api=_api;
    this.user=JSON.parse(JSON.stringify(_root.getCurrentUser()));
    this.gym=JSON.parse(JSON.stringify(_root.getCurrentUserGym()));
  }
  
  editUser(){
    this.api.updateUser(this.user).subscribe((data: any) => {
      if(this.user.isTrainer){
        this.api.updateGym(this.gym).subscribe((data: any) => {
          alert("Account succesful modified")
          this.root.setCurrentUser(this.user);
          this.root.setCurrentUserGym(this.gym)
        })
      }
      else{
        this.root.setCurrentUser(this.user);
        alert("Account succesful modified")
      }
    })
  }
  deleteUser(){
    this.api.deleteUser(this.user.id).subscribe((data: any) => {
      alert("Account succesful deleted")
      this.root.setCurrentUser(new User());
      this.root.setIsLogged(false);
      this.root.changePage("login");
    })
  }
}
