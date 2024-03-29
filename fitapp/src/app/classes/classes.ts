export class User {
    public id: any = -1;
    public name: string = "";
    public surname: string = "";
    public address: string = "";
    public email: string = "";
    public country: string = "";
    public region: string = "";
    public postalCode: string = "";
    public isTrainer: boolean = false;
    public idGym: any;
    public password: string = "";
    public city: string = "";
    public gender: string = "";
    public birthdate: string | any = null;
    constructor(dati?: any | undefined | null) {
        if (dati && dati.ID_Utente) {
            this.id = dati.ID_Utente;
            this.name = dati.Nome;
            this.surname = dati.Cognome;
            this.email = dati.Email;
            this.password = dati.Pass;
            this.country = dati.Nazione;
            this.region = dati.Regione;
            this.postalCode = dati.CAP;
            this.isTrainer = dati.IsTrainer;
            this.idGym = dati.ID_Palestra;
            this.city = dati.Citta;
            this.address = dati.Indirizzo;
            this.gender = dati.Gender
            this.birthdate = dati.DataNascita.split("T")[0];
        }
        else if (dati && dati.id) {
            this.id = dati.id;
            this.name = dati.name;
            this.surname = dati.surname;
            this.email = dati.email;
            this.password = dati.password;
            this.country = dati.country;
            this.region = dati.region;
            this.postalCode = dati.postalCode;
            this.isTrainer = dati.isTrainer;
            this.idGym = dati.idGym;
            this.city = dati.city;
            this.address = dati.address;
            this.gender = dati.gender
            this.birthdate = dati.birthdate.split("T")[0];
        }
    }
}

export class Gym {
    public id: any = -1;
    public name: string = "";
    public address: string = "";
    public country: string = "";
    public region: string = "";
    public postalCode: string = "";
    public city: string = "";
    constructor(dati?: any) {
        if (dati && dati.ID_Palestra) {
            this.id = dati.ID_Palestra;
            this.name = dati.Nome;
            this.country = dati.Nazione;
            this.region = dati.Regione;
            this.postalCode = dati.CAP;
            this.city = dati.Citta;
            this.address = dati.Indirizzo;
        }
        else if (dati && dati.id) {
            this.id = dati.id;
            this.name = dati.name;
            this.country = dati.country;
            this.region = dati.region;
            this.postalCode = dati.postalCode;
            this.city = dati.city;
            this.address = dati.address;
        }
    }
}

export class Exercise{
    id
    descrizione
    istruzioni
    linkTutorial
    muscoli
    nome
    img
    constructor(dati:any){
        this.id=dati.ID_Esercizio
        this.descrizione=dati.Descrizione
        this.istruzioni=dati.Istruzioni
        this.linkTutorial=dati.LinkTutorial
        this.muscoli=dati.Muscoli
        this.nome=dati.Nome
        this.img=dati.Path_Immagine
    }
}

export class GestExercise extends Exercise{
    serie:number = 0
    ripetizioni:any = []
    pesi:any = [] 
    check:any = false
    playRipetizioni:any
    playPesi:any
    constructor(dati:any){
        super(dati)
        this.descrizione=""
        this.istruzioni=""
        this.linkTutorial=""
        this.img=""        
        this.check = dati.check
        this.serie = dati.serie?dati.serie:null
        this.ripetizioni = dati.ripetizioni?dati.ripetizioni:[]
        this.pesi = dati.pesi?dati.pesi:[]
        this.playRipetizioni = dati.playRipetizioni?dati.playRipetizioni:[]
        this.playPesi = dati.playPesi?dati.playPesi:[]
    }
}


export class Scheda{
    id
    nome
    idPalestra
    idCliente
    idTrainer
    dataInizio
    dataFine
    constructor(dati:any){
        this.id=dati.ID_Scheda
        this.idPalestra=dati.ID_Palestra
        this.idCliente=dati.ID_Cliente
        this.idTrainer=dati.ID_Trainer
        this.dataInizio=dati.Data_inizio?dati.Data_inizio.split("T")[0]:""
        this.dataFine=dati.Data_fine?dati.Data_fine.split("T")[0]:""
        this.nome=dati.Nome
    }
}