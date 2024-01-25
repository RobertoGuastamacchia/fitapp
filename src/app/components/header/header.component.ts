import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { User } from '../../classes/user';

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
}
