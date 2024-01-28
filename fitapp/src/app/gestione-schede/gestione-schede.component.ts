import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { ModaladdschedaComponent } from './modaladdscheda/modaladdscheda.component';
import { Scheda, User } from '../classes/user';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { APIModule } from '../api/api.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gestione-schede',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,APIModule],
  templateUrl: './gestione-schede.component.html',
  styleUrl: './gestione-schede.component.css'
})
export class GestioneSchedeComponent {
  root;
  idUserScheda=-1;
  route;
  api;
  schede:Scheda[]=[]
  fullSchede:Scheda[]=[]
  constructor(_api:APIModule,_root:AppComponent,public dialog: MatDialog,_route:ActivatedRoute){
    this.root=_root
    this.route=_route
    this.api=_api
  }

  ngOnInit(){
    this.idUserScheda = parseInt(this.route.snapshot.paramMap.get('id') as string);
    let context = this;
    this.api.userSchede(this.idUserScheda).subscribe(function(r:any){
      r.forEach((element:any) => {
        context.schede.push(new Scheda(element))
        context.fullSchede.push(new Scheda(element))
      });
    })
  }
  openDialogCreateScheda(){
    let context= this;
    const dialogRef = this.dialog.open(ModaladdschedaComponent);
    dialogRef.afterClosed().subscribe((result:any) => {
        if(result){
        let scheda = new Scheda({})
        scheda.nome=result.name
        scheda.dataInizio=result.startDate
        scheda.dataFine=result.endDate
        scheda.idPalestra=null
        scheda.idCliente=context.idUserScheda
        if(context.root.getCurrentUserGym().id)
          scheda.idPalestra=context.root.getCurrentUserGym().id
        if(context.root.getCurrentUser().isTrainer)
        scheda.idTrainer=context.root.getCurrentUser().id
        context.api.createScheda(scheda).subscribe(function(r:any){
          scheda.id=r.insertId;
          context.fullSchede.push(scheda)
          context.schede = [...context.fullSchede]
          alert("Scheda creata correttamente")
        })
      }
    });
  }

  openConfirmToRemove(s:Scheda): void {
    let context= this;
    const dialogRef = this.dialog.open(ModalConfirmComponent);
    dialogRef.afterClosed().subscribe((ck:any) => {
      if(ck){
        context.api.removeUserScheda(s).subscribe(function(r:any){
          let del_u = context.fullSchede.findIndex(function(us:Scheda){return us.id==us.id})
          context.fullSchede.splice(del_u,1);
          context.schede= [...context.fullSchede]
          alert("Scheda eliminata correttamente")
        })
      }
    });
  }
}
