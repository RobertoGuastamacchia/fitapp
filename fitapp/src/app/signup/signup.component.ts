import { Component } from '@angular/core';
import { Gym, User } from '../classes/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { APIModule } from '../api/api.module';
import { } from '@angular/compiler'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, APIModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public user: User = new User()
  public gym: Gym = new Gym()

  constructor(private api: APIModule, private _router: Router) { }
  public registerNewUser() {
    this.api.checkUser(this.user.email.toLowerCase()).subscribe((r: any) => {
      if (!r) {
        if (this.checkForm()) {
          if (this.user.isTrainer) {
            this.api.registerGym(this.gym).subscribe((r: any) => {
              this.user.idGym = r.insertId;
              this.api.registerUser(this.user).subscribe((r: any) => {                  
                this._router.navigate(['servicepage'], { queryParams: { text: "User succesful registred. Try with sigin." } });
              })
            })
          }
          else{
            this.api.registerUser(this.user).subscribe((r: any) => {                  
              this._router.navigate(['servicepage'], { queryParams: { text: "User succesful registred. Try with sigin." } });
            })
          }
        }
      } else {
        alert("User already exist, change email and retry.");
        document.getElementById("email")?.classList.add("is-invalid")
      }
    })
  }
  private checkForm() {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    let ck = true;
    if (this.user.name && this.user.surname && this.user.address && this.user.birthdate && this.user.city && this.user.country
      && this.user.email && this.user.password && this.user.region && this.user.postalCode && regexp.test(this.user.email)) {
      if (this.user.isTrainer) {
        if (this.gym.name && this.gym.address && this.gym.city && this.gym.country && this.gym.postalCode && this.gym.region) {
          return true;
        }
        else {
          this._ckInputErr();
          return false;
        }
      }
      else {
        return true
      }
    }
    else {
      this._ckInputErr();
      return false;
    }
  }

  private _ckInputErr() {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    alert("Verifica i valori dei campi inseriti.")
    if (!this.user.name) {
      document.getElementById("firstName")?.classList.add("is-invalid")
    } else {
      document.getElementById("firstName")?.classList.remove("is-invalid")
    }
    if (!this.user.surname) {
      document.getElementById("lastName")?.classList.add("is-invalid")
    } else {
      document.getElementById("lastName")?.classList.remove("is-invalid")
    }
    if (!this.user.gender) {
      document.getElementById("gender")?.classList.add("is-invalid")
    } else {
      document.getElementById("gender")?.classList.remove("is-invalid")
    }
    if (!this.user.birthdate) {
      document.getElementById("gender")?.classList.add("is-invalid")
    } else {
      document.getElementById("gender")?.classList.remove("is-invalid")
    }
    if (!this.user.email || !regexp.test(this.user.email)) {
      document.getElementById("email")?.classList.add("is-invalid")
    } else {
      document.getElementById("email")?.classList.remove("is-invalid")
    }
    if (!this.user.password) {
      document.getElementById("password")?.classList.add("is-invalid")
    } else {
      document.getElementById("password")?.classList.remove("is-invalid")
    }
    if (!this.user.country) {
      document.getElementById("country")?.classList.add("is-invalid")
    } else {
      document.getElementById("country")?.classList.remove("is-invalid")
    }
    if (!this.user.region) {
      document.getElementById("region")?.classList.add("is-invalid")
    } else {
      document.getElementById("region")?.classList.remove("is-invalid")
    }
    if (!this.user.city) {
      document.getElementById("city")?.classList.add("is-invalid")
    } else {
      document.getElementById("city")?.classList.remove("is-invalid")
    }
    if (!this.user.address) {
      document.getElementById("address")?.classList.add("is-invalid")
    } else {
      document.getElementById("address")?.classList.remove("is-invalid")
    }
    if (!this.user.postalCode) {
      document.getElementById("zip")?.classList.add("is-invalid")
    } else {
      document.getElementById("zip")?.classList.remove("is-invalid")
    }
    if (this.user.isTrainer) {
      if (!this.gym.name) {
        document.getElementById("gym_name")?.classList.add("is-invalid")
      } else {
        document.getElementById("gym_name")?.classList.remove("is-invalid")
      }
      if (!this.gym.country) {
        document.getElementById("gym_country")?.classList.add("is-invalid")
      } else {
        document.getElementById("gym_country")?.classList.remove("is-invalid")
      }
      if (!this.gym.region) {
        document.getElementById("gym_region")?.classList.add("is-invalid")
      } else {
        document.getElementById("gym_region")?.classList.remove("is-invalid")
      }
      if (!this.gym.city) {
        document.getElementById("gym_city")?.classList.add("is-invalid")
      } else {
        document.getElementById("gym_city")?.classList.remove("is-invalid")
      }
      if (!this.gym.address) {
        document.getElementById("gym_address")?.classList.add("is-invalid")
      } else {
        document.getElementById("gym_address")?.classList.remove("is-invalid")
      }
      if (!this.gym.postalCode) {
        document.getElementById("gym_zip")?.classList.add("is-invalid")
      } else {
        document.getElementById("gym_zip")?.classList.remove("is-invalid")
      }
    }
  }
  setIsTrainer(){
    this.user.isTrainer=true
  }
}
