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














/*

router.post('/addArticle', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let sql = "";
    let datepublished = req.body.datepublished;
    let datemodified = req.body.datemodified;
    let metadata = req.body.metadata;
    let status = req.body.status;
    let statusText = req.body.statusText;
    let source = req.body.source;
    let url = req.body.url;
    if(datepublished && datemodified)
        sql = "INSERT INTO "+dbName+".Articoli (DatePublished,DateModified,Metadata,Status,StatusText,Fonte,Url) VALUES ('"+datepublished+"','"+datemodified+"', '"+metadata.replaceAll("'","''")+"', "+status+", '"+statusText.replaceAll("'","''")+"', '"+source+"', '"+url+"')";
    if(datepublished && !datemodified)
        sql = "INSERT INTO "+dbName+".Articoli (DatePublished,Metadata,Status,StatusText,Fonte,Url) VALUES ('"+datepublished+"', '"+metadata.replaceAll("'","''")+"', "+status+", '"+statusText.replaceAll("'","''")+"', '"+source+"', '"+url+"')";
    else if(!datepublished && datemodified)
        sql = "INSERT INTO "+dbName+".Articoli (DateModified,Metadata,Status,StatusText,Fonte,Url) VALUES ('"+datemodified+"','"+metadata.replaceAll("'","''")+"', "+status+", '"+statusText.replaceAll("'","''")+"', '"+source+"', '"+url+"')";
    else
        sql = "INSERT INTO "+dbName+".Articoli (Metadata,Status,StatusText,Fonte,Url) VALUES ('"+metadata.replaceAll("'","''")+"', "+status+", '"+statusText.replaceAll("'","''")+"', '"+source+"', '"+url+"')";

    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/addImage', isAuth, async (req, res) => {
    //console.log("echo:",req.body);
    let sql = "";
    let datecrated = req.body.datecrated;
    let datemodified = req.body.datemodified;
    let metadata = req.body.metadata;
    let code = req.body.code;
    let similar = req.body.similar;
    let labels = req.body.labels;
    let racy = req.body.racy;
    let violence = req.body.violence;
    let spoof = req.body.spoof;
    let medical = req.body.medical;
    let adult = req.body.adult;
    if(datecrated && datemodified)
        sql = "INSERT INTO "+dbName+".Immagini (CreatedDate,DateModified,Metadata,ImageCode,PageWithSimilarImage,Labels,Racy,Violence,Spoof,Medical,Adult) VALUES ('"+datecrated+"','"+datemodified+"', '"+metadata.replaceAll("'","''")+"', '"+code+"', '"+similar.replaceAll("'","''")+"', '"+labels.replaceAll("'","''")+"', '"+racy+"', '"+violence+"', '"+spoof+"', '"+medical+"', '"+adult+"')";
    else if(datecrated && !datemodified)
        sql = "INSERT INTO "+dbName+".Immagini (CreatedDate,Metadata,ImageCode,PageWithSimilarImage,Labels,Racy,Violence,Spoof,Medical,Adult) VALUES ('"+datecrated+"', '"+metadata.replaceAll("'","''")+"', "+code+", '"+similar.replaceAll("'","''")+"', '"+labels.replaceAll("'","''")+"', '"+racy+"', '"+violence+"', '"+spoof+"', '"+medical+"', '"+adult+"')";
    else if(!datecrated && datemodified)
        sql = "INSERT INTO "+dbName+".Immagini (DateModified,Metadata,ImageCode,PageWithSimilarImage,Labels,Racy,Violence,Spoof,Medical,Adult) VALUES ('"+datemodified+"','"+metadata.replaceAll("'","''")+"', "+code+", '"+similar.replaceAll("'","''")+"', '"+labels.replaceAll("'","''")+"', '"+racy+"', '"+violence+"', '"+spoof+"', '"+medical+"', '"+adult+"')";
    else
        sql = "INSERT INTO "+dbName+".Immagini (Metadata,ImageCode,PageWithSimilarImage,Labels,Racy,Violence,Spoof,Medical,Adult) VALUES ('"+metadata.replaceAll("'","''")+"', "+code+", '"+similar.replaceAll("'","''")+"', '"+labels.replaceAll("'","''")+"', '"+racy+"', '"+violence+"', '"+spoof+"', '"+medical+"', '"+adult+"')";
    console.log(sql);
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/addReport', isAuth, async (req, res) => {
    //console.log("echo:",req.body);
    let id_fonte = req.body.source;
    let id_notizia = req.body.id;
    let motivazione = req.body.type;
    let data_ora_segnalazione =new Date().toISOString().split('.')[0];
    let id_utente = req.body.user;
    let tipo_notizia = req.body.searchType;
    let segnalazione = req.body.comment;


    sql = "INSERT INTO "+dbName+".segnalazioni (ID_Fonte,ID_Notizia,Motivazione,Data_ora_segnalazione,ID_Utente,TipoNotizia,Segnalazione) VALUES ('"+id_fonte+"', "+id_notizia+", '"+motivazione+"', '"+data_ora_segnalazione+"', '"+id_utente+"', '"+tipo_notizia+"', '"+segnalazione+"')";
    console.log(sql)
    BD.Open(sql).then(function(result){
        if(id_notizia=="null"){
                sql = `Select count(*) as total from `+dbName+`.segnalazioni WHERE ID_Fonte = "${id_fonte}"`;
                BD.Open(sql).then(function(result){
                    if(result[0] && result[0].total>50){
                        sql = `Update `+dbName+`.fonti set blocked = true WHERE ID_Fonte = "${id_fonte}"`;
                        BD.Open(sql).then(function(result){
                            res.json(result);
                        })
                    }
                    else{
                        res.json(result);
                    }
                })
        }
        else{
            res.json(result);
        }
    })
});

router.post('/getReportResult', isAuth, async (req, res) => {
    //console.log("echo:",req.body);
    let typeSearch = req.body.typeSearch;
    let id_notizia = req.body.id;

    sql="select motivazione,Data_ora_segnalazione,Segnalazione,concat(b.Nome,' ',b.Cognome) as 'Utente' from "+dbName+".segnalazioni a join misinformationfightsystem.utenti b on a.ID_Utente=b.ID_Utente where a.ID_Notizia="+id_notizia+" and a.TipoNotizia='"+typeSearch+"'"
    console.log(sql)
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/getReportSource', isAuth, async (req, res) => {
    //console.log("echo:",req.body);
    let typeSearch = req.body.typeSearch;
    let id_fonte = req.body.id;

    sql="select motivazione,Data_ora_segnalazione,Segnalazione,concat(b.Nome,' ',b.Cognome) as 'Utente' from "+dbName+".segnalazioni a join misinformationfightsystem.utenti b on a.ID_Utente=b.ID_Utente where a.ID_Fonte='"+id_fonte+"' and a.TipoNotizia='"+typeSearch+"'"
    console.log(sql)
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/getArticle', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let url = req.body.url;


    sql = "SELECT * FROM "+dbName+".Articoli WHERE Url = '"+url+"'";
    BD.Open(sql).then(function(result){
        res.json(result);
    })
})

router.post('/getImage', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let code = req.body.code;


    sql = "SELECT * FROM "+dbName+".Immagini WHERE ImageCode = '"+code+"'";
    BD.Open(sql).then(function(result){
        res.json(result);
    })
})

router.post('/getSource', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let source = req.body.source;


    sql = "SELECT * FROM "+dbName+".Fonti WHERE ID_Fonte = '"+source+"'";
    BD.Open(sql).then(function(result){
        res.json(result);
    })
})

router.post('/blockSourceForUser', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let id_utente = req.body.id_utente;
    let id_fonte = req.body.id_fonte;


    sql = "INSERT INTO "+dbName+".utenti_fontibloccate (id_fonte,id_utente) VALUES('"+id_fonte+"','"+id_utente+"')";
    BD.Open(sql).then(function(result){
        res.json(result);
    })
})


router.post('/checkArticle', isAuth, async (req, res) => {
    let url = req.body.url;
    sql = `Select count(*) as total from `+dbName+`.Articoli WHERE url = "${url}"`;
    BD.Open(sql).then(function(result){
        if(result[0] && result[0].total>0){
            res.send("true");
        }
        else{
            res.send("false");
        }
    })
});

router.post('/checkImage', isAuth, async (req, res) => {
    let code = req.body.code;
    sql = `Select count(*) as total from `+dbName+`.Immagini WHERE ImageCode = "${code}"`;
    BD.Open(sql).then(function(result){
        if(result[0] && result[0].total>0){
            res.send("true");
        }
        else{
            res.send("false");
        }
    })
});


router.post('/checkSource', isAuth, async (req, res) => {
    let source = req.body.source;
    sql = `Select count(*) as total from `+dbName+`.Fonti WHERE ID_Fonte = "${source}"`;
    BD.Open(sql).then(function(result){
        if(result[0] && result[0].total>0){
            res.send("true");
        }
        else{
            res.send("false");
        }
    })
});

router.post('/checkIsBlocked', isAuth, async (req, res) => {
    let source = req.body.source;
    let utente = req.body.utente;
    sql = `select count(*) as total from (select ID_Fonte as "id_fonte" from `+dbName+`.fonti  a where blocked = true and ID_Fonte = "${source}" union select b.id_fonte from `+dbName+`.utenti_fontibloccate b  WHERE ID_Fonte = "${source}" and ID_UTENTE ="${utente}") as c`;
    BD.Open(sql).then(function(result){
        if(result[0] && result[0].total>0){
            res.send("true");
        }
        else{
            res.send("false");
        }
    })
});

router.post('/getMyBlockedSource', isAuth, async (req, res) => {
    let utente = req.body.utente;
    sql = `select b.id_fonte from `+dbName+`.utenti_fontibloccate b  WHERE ID_UTENTE ="${utente}"`;
    BD.Open(sql).then(function(result){
        res.json(result)
    })
});

router.post('/unblockedMySource', isAuth, async (req, res) => {
    let utente = req.body.utente;
    let id_fonte = req.body.source;
    sql = `delete from `+dbName+`.utenti_fontibloccate  WHERE ID_UTENTE ="${utente}" and ID_FONTE = "${id_fonte}"`;
    BD.Open(sql).then(function(result){
        res.json(result)
    })
});


router.post('/addSource', isAuth, async (req, res) => {
    console.log("echo:",req.body);
    let source = req.body.title;
    let check = req.body.check;
    let checkText = req.body.checkText.replaceAll("'","''");

    sql = `INSERT INTO `+dbName+`.Fonti (ID_Fonte,IsValid,CheckText) VALUES ("${source}",${check},"${checkText}")`;
    BD.Open(sql).then(function(result){
        res.json(result);
    })
});

router.post('/getMetaAtricle', isAuth, async (req, res) => {
    let url = req.body.url;
    const metaHeaders = [];
    const name = "source";
    const content = url.split('/')[2];
    metaHeaders.push({ name, content });    
    try{
      axios.get(url).then(function(response){
            const html = response.data;
        
            // Parse the HTML using cheerio
            const $ = cheerio.load(html);
            
            // Extract meta headers
            if($('meta')){
                $('meta').each((index, element) => {
                    let name ="";
                    if($(element).attr('name'))
                        name = $(element).attr('name');
                    if($(element).attr('property'))
                        name= $(element).attr('property');
                    const content = $(element).attr('content');
                    
                    if (name && content) {
                        metaHeaders.push({ name, content });
                    }
                    });   
            }
                     
            res.json(JSON.stringify(metaHeaders));
        
      });
    }
    catch (error) {
        res.json({"error":error});
    }
      
});

router.post('/exif', isAuth, async (req, res) => {
    
  // Esegui il comando ExifTool per ottenere i metadati dell'immagine
  const comando = `"C:\\Program Files\\ExifTool\\ExifTool.exe" -j "C:\\Users\\rguastamacchia\\Documents\\MisinformationFightSystem\\RestServices\\${req.body.filename}"`;
  try {
    const response = await axios.get(req.body.image, { responseType: 'stream' });
    const writer = fs.createWriteStream(req.body.filename);
    response.data.pipe(writer);

      writer.on('finish', function(){
        exec(comando, (errore, stdout, stderr) => {
            if (errore) {
              console.error(`Si è verificato un errore: ${errore}`);
              res.status(500).send('Errore durante l\'analisi dell\'immagine.');
              return;
            }
        
            // Analizza l'output JSON restituito da ExifTool
            const metadati = JSON.parse(stdout.trim());
        
            // Estrai la geolocalizzazione
            const geolocalizzazione = {
              latitudine: metadati[0].GPSLatitude,
              longitudine: metadati[0].GPSLongitude
            };
        
            // Crea un oggetto contenente i metadati e la geolocalizzazione
            const response = {
              metadati: metadati,
            };
            // Invia la risposta al client
            res.send(response);
          });
      });
  } catch (error) {
    res.send(error);
    throw new Error(`Error downloading image: ${error.message}`);
  }

  
});

router.post('/exiflocal', isAuth, async (req, res) => {
    
    // Esegui il comando ExifTool per ottenere i metadati dell'immagine
    const comando = `"C:\\Program Files\\ExifTool\\ExifTool.exe" -j "${req.body.filename}"`;
    try {
        exec(comando, (errore, stdout, stderr) => {
            if (errore) {
            console.error(`Si è verificato un errore: ${errore}`);
            res.status(500).send('Errore durante l\'analisi dell\'immagine.');
            return;
            }
        
            // Analizza l'output JSON restituito da ExifTool
            const metadati = JSON.parse(stdout.trim());
        
            // Estrai la geolocalizzazione
            const geolocalizzazione = {
            latitudine: metadati[0].GPSLatitude,
            longitudine: metadati[0].GPSLongitude
            };
        
            // Crea un oggetto contenente i metadati e la geolocalizzazione
            const response = {
            metadati: metadati,
            };
            // Invia la risposta al client
            res.send(response);
        });
    } catch (error) {
      res.send(error);
      throw new Error(`Error downloading image: ${error.message}`);
    }
  
    
});

*/