import { HttpHeaders } from "@angular/common/http";
export var baseUrl:any = "/assets/i18n/";
export var header :HttpHeaders|undefined= new HttpHeaders().set("Authorization","rbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjt");

export var updateHeader:HttpHeaders= new HttpHeaders().set("Authorization","rbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjt").set("accept","application/json;odata=verbose").set("content-Type","application/json;odata=verbose")
export var addHeader:HttpHeaders= new HttpHeaders().set("Authorization","rbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjt").set("accept","application/json;odata=verbose").set("content-Type","application/json;odata=verbose")


export var uploadFileHeader:HttpHeaders= new HttpHeaders().set("Authorization","rbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjt")


export var siteUrl:string = "http://localhost";
export var apiUrlList:string = "http://localhost:3000/misi";
export var env = "development";