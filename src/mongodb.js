class tabela_vendas{
    constructor() {
       this.vendas ={};
        this.mongodb= require("mongodb").MongoClient;
        this.assert = require ( "assert" );
        this.database = "banco";
         this.assert = require('assert');
         this.tabelas = "tabelas_vendas";
         this. cheerio =  require("cheerio");
    }
    
    acessar_mongodb(){
        
        return "mongodb://localhost:27017";
        
    }
  criar_banco(){
    const t =this.tabelas;
    const banco = this.database
      this.mongodb.connect(this.acessar_mongodb(),function(err,db){
                
              var client = db.db(banco);
              client.createCollection(t,{ capped : true,size:5242880,max: 5000},function(er,result){
                    console.log(t);
                    db.close();
              });
          
      })
    }
        
    
    adicionar(id,nome,valor,db,tabela){
        this.vendas.id = id;
        this.vendas.nome = nome;
        this.vendas.valor = valor;
            console.log("Connected successfully to server");
          var collection =  db.collection(tabela);
          collection.insertMany([{ids:this.vendas.id,produtos:this.vendas.nome,
            valores:this.vendas.valor}],function(err,result){
                if(err) throw console.log(err);
                console.log("adicioniou o indice "+ result +" na tabela vendas");
            });
    }
    lista(db,tabela){
        return new Promise(resolve=>{
            var tr = [{ids:"",produtos:"",valor:0}];
            console.log("Connected successfully to server");
            var collection =  db.collection(tabela);
          collection.find().toArray(function(err, docs) {
                
                console.log("Found the following records");
                for(var i =0;i<docs.length;i++){
                  tr.push({ids:docs[i].ids,produtos:docs[i].produtos,
                valor:docs[i].valores});
                }
                resolve(tr);
                
            });
        })
        
        
    }
    remover(id,db,tabela){
       var collection = db.collection(tabela);
       collection.deleteOne({ids:id},function(err,result){
        console.log("Removed the document"+id);
       })
    }
    selecionar_item(id,db,tabela){
      return new Promise(result=>{
        if(id =="")id =undefined;
        var collection = db.collection(tabela);
        collection.find({id:id}).toArray(function(err, docs) {
          var tr = [{id:""}];
          console.log(docs);
          for(var i = 0;i<docs.length;i++){
            tr.push({id:docs[i].ids});
          }
          result(tr);
        })
      })
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
            resq.header("Content-type","application/json")
                resp.redirect("/index.html");
        })
       this.app.get("/index.html",function(resquist,response){
        v.criar_banco()
        fs.readFile("c:/Users/kevin/Desktop/grub_mongodb/www/index.html",function(err,data){
            response.end(data);
        })
       })
       this.app.post("/index",function(res,resq)
       {
          if(res.body.botao =="inserir"){
            v.mongodb.connect(v.acessar_mongodb(),function(err,db){
                const vendas = db.db(v.database);
             v.adicionar(res.body.id,res.body.produto,res.body.valor,vendas,v.tabelas);
             db.close();
             resq.redirect("/index.html");
            })
          }
          else if(res.body.botao =="lista")
          {
            v.mongodb.connect(v.acessar_mongodb(),function(err,db){
                const vendas = db.db(v.database);
               
           v.lista(vendas,v.tabelas).then(resp=>
           {
                
               x = resp;
               db.close();
               var dados  = {};
               for(var i = 0;i<x.length;i++){
                 dados.id += x[i].ids+" , ";
                 dados.produto += x[i].produtos + " , ";
                 dados.valor += x[i].valor + " , ";
               }
               var exibe = "id:"+dados.id + " produtos: "+dados.produto + " valor: "+dados.valor;
               resq.end(exibe)
           });     
          })
        }
        else if(res.body.botao =="delete"){
          v.mongodb.connect(v.acessar_mongodb(),function(err,db){
            const banco = db.db(v.database);
            v.selecionar_item(res.body.id,banco,v.tabelas).then(function(resp){
              for(var o =0;o<resp.length;o++){
                v.remover(resp[o].id,banco,v.tabelas)
              }
            })
           
            db.close();
            resq.redirect("/index.html");
          })
        }
});
       var httpServer = http.createServer(this.app);
       httpServer.listen(8080,"localhost",function(err){
       });