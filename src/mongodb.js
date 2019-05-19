class tabela_vendas{
    constructor() {
       this.vendas ={};
        this.mongodb= require("mongodb").MongoClient;
        this.assert = require ( "assert" );
        this.database = "banco";
         this.assert = require('assert');
         this.tabela = "vendas";
    }
    
    acessar_mongodb(){
        
        return "mongodb://localhost:27017";
        
    }
  criar_banco(){
        
      this.mongodb.connect(this.acessar_mongodb(),function(err,db){
       
              var client = db.db(tabela_vendas.database);
              
          db.close();
      })
    }
        
    
    adicionar(id,nome,valor,db,tabela){
        this.vendas.id = id;
        this.vendas.nome = nome;
        this.vendas.valor = valor;
            console.log("Connected successfully to server");
          var collection =  db.collection(tabela);
          collection.insertMany([{ids:this.vendas.id},{produtos:this.vendas.produto},
            {valores:this.vendas.valor}],function(err,result){
                if(err) throw console.log(err);
                console.log("adicioniou o indice "+ result+" na tabela vendas");
            });
    }
    lista(id,db,tabela){
        this.vendas.id = id;
        console.log("Connected successfully to server");
        var collection =  db.collection(tabela);
        collection.find({ids:this.vendas.id}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.log(docs);
        });
    }
    remover(id){
       this.vendas.id = id;
    }
    notificar(data){
        this.vendas.forEach(v=>v(data));
    }
   
}
        this.express = require("express");
        this.app = this.express();
        var http = require('http');
        var fs = require('fs');
        const v = new tabela_vendas();
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.get("/",function(resq,resp){
            resq.header('Content-type', 'text/html');
                resp.redirect("/index.html");
        })
       this.app.get("/index.html",function(resquist,response){
        v.criar_banco()
        fs.readFile("c:/Users/kevin/Desktop/grub_mongodb//www/index.html",function(err,data){
            console.log(data);
            response.end(data);
        })
       })
       this.app.post("*",function(res,resq)
       {
           v.mongodb.connect(v.acessar_mongodb(),function(err,db){
               const vendas = db.db(v.database);
            v.adicionar(res.body.id,res.body.produto,res.body.valor,vendas,v.tabela);
           })
         
       })
      
       var httpServer = http.createServer(this.app);
       httpServer.listen(8080,"localhost",function(err){

       });