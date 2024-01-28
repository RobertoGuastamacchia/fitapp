const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const BD = require('../util/database');
const dbName = "fitapp";

router.post('/registerUser', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let firstName = req.body.name;
    let lastName = req.body.surname;
    let email = req.body.email;
    let region = req.body.region;
    let pass = req.body.pass;
    let country = req.body.country;
    let birthDay = req.body.birthday;
    let address = req.body.address;
    let city = req.body.city;
    let postalCode = req.body.postalCode;
    let isTrainer = req.body.isTrainer;
    let gender = req.body.gender;
    let idGym = req.body.idGym;
    if(isTrainer){
        sql = `INSERT INTO `+dbName+`.Utenti (Nome,Cognome,Email,Pass,Regione,Nazione,Indirizzo,DataNascita,Gender,IsTrainer,CAP,Citta,ID_Palestra) VALUES ("${firstName}", "${lastName}", "${email}", "${pass}", "${region}", "${country}","${address}","${birthDay}","${gender}",${isTrainer},"${postalCode}","${city}",${idGym})`;

    }else{
        sql = `INSERT INTO `+dbName+`.Utenti (Nome,Cognome,Email,Pass,Regione,Nazione,Indirizzo,DataNascita,Gender,IsTrainer,CAP,Citta) VALUES ("${firstName}", "${lastName}", "${email}", "${pass}", "${region}", "${country}","${address}","${birthDay}","${gender}",${isTrainer},"${postalCode}","${city}")`;

    }
    console.log(sql);
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/registerGym', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let name = req.body.name;
    let region = req.body.region;
    let country = req.body.country;
    let address = req.body.address;
    let city = req.body.city;
    let postalCode = req.body.postalCode;
    sql = `INSERT INTO `+dbName+`.Palestre (Nome,Regione,Nazione,Indirizzo,CAP,Citta) VALUES ("${name}", "${region}", "${country}","${address}","${postalCode}","${city}")`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/deleteUser', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let id = req.body.id;
    sql = `DELETE FROM `+dbName+`.Utenti where ID_UTENTE = ${id}`;
    console.log(sql);
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/checkUser', isAuth, async (req, res) => {
    let email = req.body.email;
    sql = `Select count(*) as total from `+dbName+`.Utenti WHERE email = "${email}" and isDelete = 0`;
    BD.Open(sql).then(function(result){
        if(result[0] && result[0].total>0){
            res.send("true");
        }
        else{
            res.send("false");
        }
    })
});

router.post('/login', isAuth, async (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    sql = `Select * from `+dbName+`.Utenti WHERE email = "${email}" and pass = "${pass}" and isDelete = 0`;
    BD.Open(sql).then(function(result){
        if(result && result[0]){
            res.json(result[0]);
        }
        else{
            res.send("false");
        }
    })
});


router.post('/getgym', isAuth, async (req, res) => {
    let id = req.body.id;
    sql = `Select * from `+dbName+`.Palestre WHERE ID_Palestra = ${id}`;
    console.log(sql);
    BD.Open(sql).then(function(result){
        if(result && result[0]){
            res.json(result[0]);
        }
        else{
            res.send("false");
        }
    })
});

router.post('/updateUser', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let id = req.body.id;
    let firstName = req.body.name;
    let lastName = req.body.surname;
    let region = req.body.region;
    let pass = req.body.password;
    let country = req.body.country;
    let address = req.body.address;
    let postalCode = req.body.postalCode;
    let city = req.body.city;
    sql = `UPDATE `+dbName+`.Utenti SET Nome = "${firstName}" ,Cognome = "${lastName}" ,Pass="${pass}",Regione="${region}",Nazione="${country}",Indirizzo="${address}",CAP="${postalCode}",Citta = "${city}" where ID_Utente = ${id}`;

    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/updateGym', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let id = req.body.id;
    let name = req.body.name;
    let region = req.body.region;
    let country = req.body.country;
    let address = req.body.address;
    let city = req.body.city;
    let postalCode = req.body.postalCode;
    sql = `UPDATE `+dbName+`.Palestre SET Nome="${name}",Regione="${region}",Nazione="${country}",Indirizzo="${address}",CAP="${postalCode}",Citta="${city}" where ID_Palestra=${id}`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.get('/getExercises', isAuth, async (req, res) => {
    sql = `SELECT * FROM `+dbName+`.Esercizi`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});


router.get('/getFreeUsers', isAuth, async (req, res) => {
    sql = `SELECT * FROM `+dbName+`.Utenti where ID_Palestra is null`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/addUserToGym', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let idUtente = req.body.id;
    let idPalestra = req.body.idGym;
    sql = `UPDATE `+dbName+`.Utenti SET ID_Palestra=${idPalestra} where ID_UTENTE=${idUtente}`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});


router.post('/removeUserToGym', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let idUtente = req.body.id;
    sql = `UPDATE `+dbName+`.Utenti SET ID_Palestra=null where ID_UTENTE=${idUtente}`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/removeUserScheda', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let idScheda = req.body.id;
    sql = `Delete From `+dbName+`.schede where ID_Scheda=${idScheda}`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});


router.post('/getGymUsers', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let idTrainer = req.body.id;
    let idPalestra = req.body.idGym;
    sql = `SELECT * FROM `+dbName+`.Utenti WHERE ID_Palestra=${idPalestra} and ID_UTENTE != ${idTrainer}`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/createScheda', isAuth, async (req, res) => {
    let idTrainer = req.body.idTrainer;
    let idPalestra = req.body.idPalestra;
    let idCliente = req.body.idCliente;
    let startDate = req.body.dataInizio;
    let endDate = req.body.dataFine;
    let name = req.body.nome;
    sql = `INSERT INTO `+dbName+`.schede (ID_Palestra,ID_Cliente,Data_inizio,Data_fine,Nome,ID_Trainer) VALUES(${idPalestra},${idCliente},"${startDate}","${endDate}","${name}",${idTrainer})`;
    console.log(sql)
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/userSchede', isAuth, async (req, res) => {
    let id = req.body.id;
    sql = `Select * FROM  `+dbName+`.schede where ID_Cliente  = ${id}`;
    console.log(sql)
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/saveScheda', isAuth, async (req, res) => {
    let id = req.body.id;
    let json = req.body.json;
    sql = `UPDATE  `+dbName+`.schede SET json = '${json}' where ID_Scheda  = ${id}`;
    //console.log(sql)
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/getScheda', isAuth, async (req, res) => {
    let id = req.body.id;
    sql = `Select * from `+dbName+`.schede where ID_Scheda = ${id}`;
    console.log(sql)
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});



function isAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'rbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjtrwftevblum1jvefyu0vhu3lqzvjtsvrbclnfyvn5ugvsbuluqxjt') {
        next();
    } else {
        res.status(401);
        res.send('Access forbidden');
    }
}


module.exports = router;


