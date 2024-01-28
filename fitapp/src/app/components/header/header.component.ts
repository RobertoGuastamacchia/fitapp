import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { User } from '../../classes/classes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  root;
  constructor(_root: AppComponent){
    this.root=_root;
  }

  goHome(){
    if(this.root.isLogged){
      this.root.changePage("home")
    }
    else{      
      this.root.changePage("login")
    }
  }
}
