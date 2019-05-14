class tabela_vendas{
    constructor() {
       this.vendas ={};
        this.mongodb= require("mongodb").MongoClient;
        this.assert = require ( "assert" );
       
    }
    
    acessar_mongodb(){
        
        return "mongodb://localhost:27017";
        
    }
  criar_banco(){
        
      this.mongodb.connect(this.acessar_mongodb(),function(err,db){
          var database ="test";
              const client = db.db(database);
              client.collection("vendas");
              console.log("teu certo");
          db.close();
      })
    }
        
    
    adicionar(id,nome,valor){
        this.vendas.id = id;
        this.vendas.nome = nome;
        this.vendas.valor = valor;
      
           return this.mongodb.connect(this.acessar_mongodb(),function(err,db){
            this.assert.equal(err,null);
            console.log("Connected successfully to server");
            this.client = db.db(this.database);
            this.client.collection("vendas").insertOne(this.vendas,function(err,res){
                if(err)throw err;
                console.log("1 documento inserto");
                db.close();
            })
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
        const v = new tabela_vendas();
        this.app.listen(8000,function(err){
           
        })
        this.app.get("/",function(resq,resp){
            resq.header('Content-type', 'text/html');
                resp.redirect("/index.html");
        })
       this.app.get("/index.html",function(resquist,response){
        v.criar_banco()
       })
       this.app.set('port', process.env.PORT  || 8000);
       
       var httpServer = http.createServer(this.app);
       httpServer.listen(8080,"localhost",function(err){

       });