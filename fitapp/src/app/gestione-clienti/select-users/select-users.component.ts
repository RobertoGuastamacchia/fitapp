import { Component } from '@angular/core';
import { APIModule } from '../../api/api.module';
import { User } from '../../classes/classes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-select-users',
  standalone: true,
  imports: [CommonModule,FormsModule,APIModule,MatInputModule,MatMenuModule,MatDialogClose],
  templateUrl: './select-users.component.html',
  styleUrl: './select-users.component.css'
})
export class SelectUsersComponent {
  api
  users:User[] = []
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
  constructor(_api:APIModule){
    let context=this
    this.api=_api
    this.api.getFreeUsers().subscribe(function(result:any){
      result.forEach((e:any) => {
        context.users.push(new User(e))
        context.fullUsers.push(new User(e))
      });
    })
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
      this.users=[...dati];

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
    this.users=[...orderData];
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
