export class User {
    public id:any= -1;
    public name:string= "";
    public surname:string= "";
    public address:string= "";
    public email:string= "";
    public country:string= "";
    public region:string= "";
    public postalCode:string= "";
    public isTrainer:boolean= false;
    public idGym:boolean= false;
    public password:string= "";
    public city:string= "";
    public gender:string= "";
    public birthdate:Date|any= null;
    constructor(dati?:any|undefined|null){
        if(dati && dati.ID_Utente){
            this.id=dati.ID_Utente;
            this.name=dati.Nome;
            this.surname=dati.Cognome;
            this.email=dati.Email;
            this.password=dati.Pass;
            this.country=dati.Nazione;
            this.region=dati.Regione;
            this.postalCode=dati.CAP;
            this.isTrainer=dati.IsTrainer;
            this.idGym=dati.ID_Palestra;
            this.city=dati.Citta;
            this.address=dati.Indirizzo;
            this.gender=dati.Gender
            this.birthdate=dati.DataNascita;
        }
        else if(dati && dati.id){
            this.id=dati.id;
            this.name=dati.name;
            this.surname=dati.surname;
            this.email=dati.email;
            this.password=dati.password;
            this.country=dati.country;
            this.region=dati.region;
            this.postalCode=dati.postalCode;
            this.isTrainer=dati.isTrainer;
            this.idGym=dati.idGym;
            this.city=dati.city;
            this.address=dati.address;
            this.gender=dati.gender
            this.birthdate=dati.birthdate;
        }
    }
}

export class Gym {
    public id:any= -1;
    public name:string= "";
    public address:string= "";
    public country:string= "";
    public region:string= "";
    public postalCode:string= "";
    public city:string= "";
}
