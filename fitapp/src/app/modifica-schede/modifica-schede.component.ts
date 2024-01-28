import { Component } from '@angular/core';
import { APIModule } from '../api/api.module';
import { Exercise, GestExercise } from '../classes/classes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from '../esercizi/exercise/exercise.component';
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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-modifica-schede',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,APIModule,AppComponent,MatMenuModule,MatInputModule],
  templateUrl: './modifica-schede.component.html',
  styleUrl: './modifica-schede.component.css'
})
export class ModificaSchedeComponent {
  root;
  idScheda=-1;
  idCliente=-1;
  route;
  api;
  exes:GestExercise[] = []
  fullexes:GestExercise[] = []
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
  constructor(_api:APIModule,_root:AppComponent,public dialog: MatDialog,_route:ActivatedRoute){
    this.root=_root
    this.route=_route
    this.api=_api
    this.api.getExercises().subscribe((data:any) => {
      data.forEach((element:any) => {
        this.exes.push(new GestExercise(element))        
        this.fullexes.push(new GestExercise(element))
      });
      console.log(this.exes);
    })
  }
  ngOnInit(){
    this.idScheda = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.idCliente = parseInt(this.route.snapshot.paramMap.get('idCliente') as string);
    let context = this;
    
    this.api.getScheda(this.idScheda).subscribe(function(r:any){
      if(r.length>0 && r[0].JSON){
        context.exes = JSON.parse(r[0].JSON) as GestExercise[]
      }
    })
  }

  openDialog(exe:GestExercise): void {
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

  saveScheda(){
    this.api.saveScheda(this.idScheda,this.exes).subscribe(function(r:any){
      alert("Scheda salvata correttamente")
    })
  }

}
