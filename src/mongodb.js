class tabela_vendas{
    constructor() {
       this.vendas ={};
        this.mongodb= require("mongodb").MongoClient;
        this.assert = require ( "assert" );
        
         this.assert = require('assert');
    }
    
    acessar_mongodb(){
        
        return "mongodb://localhost:27017";
        
    }
  criar_banco(){
        
      this.mongodb.connect(this.acessar_mongodb(),function(err,db){
       const database = "banco";
              const client = db.db(database);
              console.log("teu certo");
          db.close();
      })
    }
        
    
    adicionar(id,nome,valor){
        this.vendas.id = id;
        this.vendas.nome = nome;
        this.vendas.valor = valor;
      
        this.mongodb.connect(this.acessar_mongodb(),function(err,db){
            this.assert.equal(err,null);
            console.log("Connected successfully to server");
            var client = db.db(this.database);
            client.collection("vendas").insert(this.vendas);
            this.assert.equal(err,null);
            db.close();
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
       this.app.post("inserir_valor",function(res,resq){
           v.adicionar(0,"marcarrão",20);
       })
       this.app.set('port', process.env.PORT  || 8000);
       
       var httpServer = http.createServer(this.app);
       httpServer.listen(8080,"localhost",function(err){

       });