import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Gym, User } from '../classes/classes';
import { APIModule } from '../api/api.module';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule,CommonModule,APIModule,RouterModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user:User = new User()
  gym:Gym = new Gym()
  root:any
  api:any
  constructor(_root:AppComponent,_api:APIModule,public dialog: MatDialog){
    this.root=_root;
    this.api=_api;
    this.user=JSON.parse(JSON.stringify(_root.getCurrentUser()));
    this.gym=JSON.parse(JSON.stringify(_root.getCurrentUserGym()));
  }
  
  editUser(){
    this.api.updateUser(this.user).subscribe((data: any) => {
      if(this.user.isTrainer){
        this.api.updateGym(this.gym).subscribe((data: any) => {
          this.root.showAlert("Account modificato correttamente")
          this.root.setCurrentUser(this.user);
          this.root.setCurrentUserGym(this.gym)
        })
      }
      else{
        this.root.setCurrentUser(this.user);
        this.root.showAlert("Account modificato correttamente")
      }
    })
  }
  openConfirmToRemove(): void {
    let context= this;
    const dialogRef = this.dialog.open(ModalConfirmComponent);
    dialogRef.afterClosed().subscribe((ck:any) => {
      if(ck){
        this.api.deleteUser(this.user.id).subscribe((data: any) => {
          this.root.showAlert("Account modificato correttamente")
          this.root.setCurrentUser(new User());
          this.root.setIsLogged(false);
          this.root.changePage("login");
        })
      }
    });
  }
}
