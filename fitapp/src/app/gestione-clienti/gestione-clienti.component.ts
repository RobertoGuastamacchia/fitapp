import { Component } from '@angular/core';
import { Exercise, User } from '../classes/classes';
import { SelectUsersComponent } from './select-users/select-users.component';
import { APIModule } from '../api/api.module';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from '../esercizi/exercise/exercise.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestione-clienti',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,APIModule,AppComponent,MatMenuModule,MatInputModule],
  templateUrl: './gestione-clienti.component.html',
  styleUrl: './gestione-clienti.component.css'
})
export class GestioneClientiComponent {
  clienteToAdd:User = new User()
  myUsers:User[]=[]
  api:any
  root:AppComponent
  fullUsers:User[] = []
  sortColumn:any= {
    field:"",
    active:false,
    value:""
  };
  sortOrder: string | null = null;
  filters: any = {
    name:{
      active:false,
      value:""
    },
    surname:{
      active:false,
      value:""
    },
    email:{
      active:false,
      value:""
    }
  }
  constructor(_root:AppComponent,_api:APIModule,public dialog: MatDialog){
    this.api=_api
    this.root=_root
    let context = this;
    this.api.getGymUsers(this.root.getCurrentUser()).subscribe(function(users:any){
      users.forEach((element:any) => {
        context.myUsers.push(new User(element))
        context.fullUsers.push(new User(element))
      });
    })
  }

  openDialogAddUser(): void {
    let context= this;
    const dialogRef = this.dialog.open(SelectUsersComponent);
    dialogRef.afterClosed().subscribe((newUser:User) => {
      newUser.idGym = context.root.getCurrentUserGym().id;
      context.api.addUserToGym(newUser).subscribe(function(r:any){
        context.root.showAlert("Utente inscritto Correttamente")
        context.fullUsers.push(newUser)
        context.filterTable()
      })
    });
  }


  openConfirmToRemove(u:User): void {
    let context= this;
    const dialogRef = this.dialog.open(ModalConfirmComponent);
    dialogRef.afterClosed().subscribe((ck:any) => {
      if(ck){
        context.api.removeUserToGym(u).subscribe(function(r:any){
          let del_u = context.myUsers.findIndex(function(us:User){return u.id==us.id})
          context.fullUsers.splice(del_u,1);
          context.filterTable()
          context.root.showAlert("Utente rimosso correttamente")
        })
      }
    });
  }

  public filterTable() {
    let context = this;
    let dati = [...context.fullUsers]
    Object.keys(this.filters).forEach((key: string) => {
        if (context.filters[key].value) {
          dati = [...dati.filter(function (v: any) { return (v[key] + "").toLocaleLowerCase().indexOf(context.filters[key].value.toLocaleLowerCase()) >= 0 ? true : false })]
          context.filters[key].active = true;
        }
        else {
          context.filters[key].active = false;
        }
      this.myUsers=[...dati];

    });
  }

  public sortTable(column: string) {
    if (column && column != this.sortColumn?.field) {
      this.sortColumn.field = column;
      this.sortOrder = "asc"
    }
    else if (column && column == this.sortColumn?.field && this.sortOrder == "asc") {
      this.sortOrder = "desc"
    }
    else if (column && column == this.sortColumn?.field && this.sortOrder == "desc") {
      this.sortOrder = null;
      this.sortColumn = {
        active:false,
        value:""
      };
    }
    let context = this;
    let orderData = [...this.fullUsers].sort(
      (a: any, b: any) => {
        if (context.sortOrder == "asc" && context.sortColumn) {
          if (a[context.sortColumn!.field] < b[context.sortColumn!.field]) {
            return -1;
          }
          else {
            return 1;
          }
        }
        else if (context.sortOrder == "desc" && context.sortColumn) {
          if (a[context.sortColumn!.field] < b[context.sortColumn!.field]) {
            return 1;
          }
          else {
            return -1;
          }
        }
        else {
          return 0;
        }
      }
    )
    this.myUsers=[...orderData];
  }

  public clearFilter(header: string) {
    this.filters[header]={
      nome:{
        active:false,
        value:""
      }}
    this.filterTable();
  }

}
