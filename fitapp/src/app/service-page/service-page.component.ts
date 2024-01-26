import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { APIModule } from '../api/api.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent {
  text:string="";
  constructor(private _router:Router, private route:ActivatedRoute) {
    this.text =this.route.snapshot.queryParams["text"] as string;
  }
  changePage(page :string) {
    this._router.navigate([page]);
  }
}
