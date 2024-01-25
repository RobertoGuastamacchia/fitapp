import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../classes/user';
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
          this.root.setCurrentUser(user);
          this.root.setIsLogged(true);
          this.root.changePage("home")
          localStorage.setItem("user",JSON.stringify(user))       
          }else{
            document.getElementById("email")?.classList.add("is-invalid");
            document.getElementById("password")?.classList.add("is-invalid");
            alert("Email e/o password non valida, riprova.")            
          }   
        });
      }
      else{
        document.getElementById("email")?.classList.add("is-invalid");
        document.getElementById("password")?.classList.add("is-invalid");
        alert("email e/o password non valida, riprova.")
      }
  }
}

class LoginData{
  public password:string = ""
  public email:string = ""
}
