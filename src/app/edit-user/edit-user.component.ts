import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Gym, User } from '../classes/user';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user:User = new User()
  gym:Gym = new Gym()
  constructor(_root:AppComponent){
    this.user=_root.getCurrentUser();
  }
  
  editUser(){}
}
