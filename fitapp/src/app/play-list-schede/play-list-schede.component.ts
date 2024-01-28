import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { Scheda, User } from '../classes/classes';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { APIModule } from '../api/api.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-play-list-schede',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,APIModule],
  templateUrl: './play-list-schede.component.html',
  styleUrl: './play-list-schede.component.css'
})
export class PlayListSchedeComponent {
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
    this.idUserScheda = this.root.getCurrentUser().id;
    let context = this;
    this.api.userSchede(this.idUserScheda).subscribe(function(r:any){
      r.forEach((element:any) => {
        context.schede.push(new Scheda(element))
        context.fullSchede.push(new Scheda(element))
      });
    })
  }  
}
