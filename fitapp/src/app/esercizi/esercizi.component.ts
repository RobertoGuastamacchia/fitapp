import { Component } from '@angular/core';
import { APIModule } from '../api/api.module';
import { Exercise } from '../classes/classes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise/exercise.component';
import { MatButtonModule } from '@angular/material/button';
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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-esercizi',
  standalone: true,
  imports: [APIModule,FormsModule,CommonModule,MatButtonModule,MatMenuModule,MatInputModule,RouterModule],
  templateUrl: './esercizi.component.html',
  styleUrl: './esercizi.component.css'
})
export class EserciziComponent {
  exes:Exercise[] = []
  fullexes:Exercise[] = []
  sortColumn:any= {
    field:"",
    active:false,
    value:""
  };
  sortOrder: string | null = null;
  filters: any = {
    nome:{
      active:false,
      value:""
    },
    descrizione:{
      active:false,
      value:""
    },
    muscoli:{
      active:false,
      value:""
    }
  }
  constructor(api:APIModule,public dialog: MatDialog){
    api.getExercises().subscribe((data:any) => {
      data.forEach((element:any) => {
        this.exes.push(new Exercise(element))        
        this.fullexes.push(new Exercise(element))
      });
      console.log(this.exes);
    })
  }

  openDialog(exe:Exercise): void {
    const dialogRef = this.dialog.open(ExerciseComponent);
    let c = dialogRef.componentInstance;
    c.data = (exe)
    dialogRef.afterClosed().subscribe(result => {});
  }
  
  public filterTable() {
    let context = this;
    let dati = [...context.fullexes]
    Object.keys(this.filters).forEach((key: string) => {
        if (context.filters[key].value) {
          dati = [...dati.filter(function (v: any) { return (v[key] + "").toLocaleLowerCase().indexOf(context.filters[key].value.toLocaleLowerCase()) >= 0 ? true : false })]
          context.filters[key].active = true;
        }
        else {
          context.filters[key].active = false;
        }
      this.exes=[...dati];

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
    let orderData = [...this.fullexes].sort(
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
    this.exes=[...orderData];
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
