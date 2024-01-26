const mysql = require('mysql');
var $ = require('jquery-deferred');
const configDB = require('../config/config.json');

const config = { 
  user: configDB.user, 
  password: configDB.password, 
  host: configDB.connectionString};

  
  


function Open(sqlQuery) {
  var def = $.Deferred()
  var con = mysql.createConnection(config)
  con.connect(function(err) {
    if (err){
      def.resolve({error:err})
    }
    con.query(sqlQuery, function (err, result) {
      if (err){
        def.resolve({error:err})
      };
      def.resolve(result)
    });
  })
  return def.promise()
}

exports.Open = Open;