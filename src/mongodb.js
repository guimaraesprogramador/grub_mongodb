const mongodb= require("mongodb").MongoClient;
const assert = require ( ' assert ' ) ; 
const url = ' mongodb: // localhost: 27017 ' ;   
 const database = "banco_contas";
mongodb.connect(url,function(err,client){
assert.equal(null,err);
console.log("Connected successfully to server");
const db = client.db(database);
db.command("create table contas("+
+"id int primary key null"+"nome_produto varchar(250) not null "+
"valor float not null");
client.close();
});