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
  selector: 'app-play-schede',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,APIModule,AppComponent,MatMenuModule,MatInputModule],
  templateUrl: './play-schede.component.html',
  styleUrl: './play-schede.component.css'
})
export class PlaySchedeComponent {
  idScheda=-1;
  root;
  route;
  api;
  exist=false;
  idCliente=-1
  exes:GestExercise[] = []
  fullexes:GestExercise[] = []
  constructor(_api:APIModule,_root:AppComponent,public dialog: MatDialog,_route:ActivatedRoute){
    this.root=_root
    this.route=_route
    this.api=_api
  }
  ngOnInit(){
    this.idScheda = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.idCliente = parseInt(this.route.snapshot.paramMap.get('idCliente') as string);
    let context = this;
    this.api.checkSchedaWork(this.idScheda,new Date().toISOString().split("T")[0]).subscribe(function(r:any){
      if(r.length==0){
        context.api.getScheda(context.idScheda).subscribe(function(r:any){
          if(r.length>0 && r[0].JSON){
            context.exes = (JSON.parse(r[0].JSON)as GestExercise[])
            context.exes = context.exes.filter(function(x:any){return x.check})
            context.exes.forEach((ex:GestExercise) => {
              for(let i = 0 ; i<ex.serie;i++){
                ex.playPesi[i]=null
                ex.playRipetizioni[i]=null;
              }
            });
            context.fullexes = (JSON.parse(r[0].JSON)as GestExercise[])
            context.fullexes = context.fullexes.filter(function(x:any){return x.check})
            context.fullexes.forEach((ex:GestExercise) => {
              for(let i = 0 ; i<ex.serie;i++){
                ex.playPesi[i]=null
                ex.playRipetizioni[i]=null;
              }
            });
          }
        })
      }
      else{
        context.exist=true;
        context.exes=(JSON.parse(r[0].JSON)as GestExercise[])
        context.fullexes=(JSON.parse(r[0].JSON)as GestExercise[])
      }
    })
    
  }

  openDialog(exe:GestExercise): void {
    const dialogRef = this.dialog.open(ExerciseComponent);
    let c = dialogRef.componentInstance;
    c.data = (exe)
    dialogRef.afterClosed().subscribe(result => {});
  }

  saveWorkDay(){
    let context = this.root;
    if(this.exist){
      this.api.updateSchedaWork(this.idScheda,this.exes,new Date().toISOString().split("T")[0]).subscribe(function(r:any){
        context.showAlert("WorkDay aggiornato correttamente")
      })
    }
    else{
      this.api.saveSchedaWork(this.idScheda,this.exes,new Date().toISOString().split("T")[0]).subscribe(function(r:any){
        context.showAlert("WorkDay inserito correttamente")
      })
    }
    
  }
}
