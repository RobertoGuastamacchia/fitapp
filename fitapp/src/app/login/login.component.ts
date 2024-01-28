import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Gym, User } from '../classes/classes';
import { AppComponent } from '../app.component';
import { APIModule } from '../api/api.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterLink,APIModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  root:any=null;
  constructor(root: AppComponent, private api: APIModule, private _router: Router) {
    this.root=root;
  }
  formData = new LoginData();
  logIn(){
    if(this.formData.email && this.formData.password){
        this.api.login(this.formData.email.toLowerCase(),this.formData.password).subscribe((data: any) => {
          if(data){     
          document.getElementById("email")?.classList.remove("is-invalid");
          document.getElementById("password")?.classList.remove("is-invalid");
          let user = new User(data);
          this.api.getGym(user.idGym).subscribe((data: any) => {
            this.root.setCurrentUser(user);
            let gym = new Gym(data);
            this.root.setCurrentUserGym(gym);
            this.root.setIsLogged(true);
            this.root.changePage("home")
            localStorage.setItem("user",JSON.stringify(user))       
            localStorage.setItem("gym",JSON.stringify(gym))       
          })
          }else{
            document.getElementById("email")?.classList.add("is-invalid");
            document.getElementById("password")?.classList.add("is-invalid");
            this.root.showAlert("Email e/o password non valida, riprova.")            
          }   
        });
      }
      else{
        document.getElementById("email")?.classList.add("is-invalid");
        document.getElementById("password")?.classList.add("is-invalid");
        this.root.showAlert("email e/o password non valida, riprova.")
      }
  }
}

class LoginData{
  public password:string = ""
  public email:string = ""
}
