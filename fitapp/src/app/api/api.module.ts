import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { siteUrl, header, apiUrlList, addHeader, updateHeader, uploadFileHeader } from "../envirorment/envirorment";
import { Observable } from 'rxjs';
import axios from 'axios';
import { GestExercise, Gym, Scheda, User } from '../classes/classes';

declare var require: any


class Header {
  public header: any;
  constructor(headerSet: HttpHeaders | undefined) {
    this.header = {
      headers: headerSet
    }
  }
}


@NgModule({
  
})
@Injectable()
export class APIModule {
  constructor(private http: HttpClient) { }
  registerUser(item: User): any {
    var data = {
      name: item.name ? item.name : "",
      surname: item.surname ? item.surname : "",
      email: item.email ? item.email : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      birthday: item.birthdate ? item.birthdate : "",
      pass: item.password ? item.password : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : "",
      gender: item.gender ? item.gender : "",
      isTrainer: item.isTrainer ? item.isTrainer : false,
      idGym: item.idGym ? item.idGym : -1
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/registerUser", data, headerRQS.header);
  }

  registerGym(item: Gym): any {
    var data = {
      name: item.name ? item.name : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : "",      
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/registerGym", data, headerRQS.header);
  }


  updateGym(item: Gym): any {
    var data = {
      id:item.id?item.id:-1,
      name: item.name ? item.name : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : "",      
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/updateGym", data, headerRQS.header);
  }

  updateUser(item: User): any {
    var data = {
      id:item.id?item.id:-1,
      name: item.name ? item.name : "",
      surname: item.surname ? item.surname : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      password: item.password ? item.password : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/updateUser", data, headerRQS.header);
  }

  checkUser(email: string): any {
    var data = {
      email: email ? email : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkUser", data, headerRQS.header);
  }

  deleteUser(id: string): any {
    var data = {
      id: id ? id : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/deleteUser", data, headerRQS.header);
  }

  login(email: string, password: string): any {
    var data = {
      email: email ? email : "",
      pass: password ? password : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/login", data, headerRQS.header);
  }

  getGym(id: string): any {
    var data = {
      id: id ? id : -1,
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getgym", data, headerRQS.header);
  }

  getExercises(): any {
    var headerRQS: Header = new Header(header);
    return this.http.get(apiUrlList + "/getExercises", headerRQS.header);
  }

  getFreeUsers(): any {
    var headerRQS: Header = new Header(header);
    return this.http.get(apiUrlList + "/getFreeUsers", headerRQS.header);
  }

  addUserToGym(utente:User): any {
    var data = utente;
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/addUserToGym",data, headerRQS.header);
  }

  removeUserToGym(utente:User): any {
    var data = utente;
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/removeUserToGym",data, headerRQS.header);
  }

  removeUserScheda(scheda:Scheda): any {
    var data = scheda;
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/removeUserScheda",data, headerRQS.header);
  }

  getGymUsers(trainer:User): any {
    var data = trainer;
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getGymUsers",data, headerRQS.header);
  }


  createScheda(scheda:Scheda):any{
    var data = scheda;
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/createScheda",data, headerRQS.header);
  }
  

  userSchede(id:any):any{
    var data = {id:id};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/userSchede",data, headerRQS.header);
  }

  userSchedeActive(id:any):any{
    var data = {id:id};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/userSchedeActive",data, headerRQS.header);
  }

  saveScheda(id:any,scheda:GestExercise[]):any{
    var data = {id:id,json:JSON.stringify(scheda)};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/saveScheda",data, headerRQS.header);
  }

  getScheda(id:any):any{
    var data = {id:id};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getScheda",data, headerRQS.header);
  }

  saveSchedaWork(id:any,scheda:GestExercise[],date:string){
    var data = {id:id,json:JSON.stringify(scheda),date:date};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/saveSchedaWork",data, headerRQS.header);
  }

  updateSchedaWork(id:any,scheda:GestExercise[],date:string){
    var data = {id:id,json:JSON.stringify(scheda),date:date};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/updateSchedaWork",data, headerRQS.header);
  }

  checkSchedaWork(id:any,date:string){
    var data = {id:id,date:date};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkSchedaWork",data, headerRQS.header);
  }

  getExercise(id:any){
    var data = {id:id};
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getExercise",data, headerRQS.header);
  }
}