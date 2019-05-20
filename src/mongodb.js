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
                valor:docs[i].valor});
                }
                resolve(tr);
                
            });
        })
        
        
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
        fs.readFile("c:/Users/kevin/Desktop/grub_mongodb/www/index.html",function(err,data){
            response.end(data);
        })
       })
       this.app.post("/index",function(res,resq)
       {
          if(res.body.botao =="inserir"){
            v.mongodb.connect(v.acessar_mongodb(),function(err,db){
                const vendas = db.db(v.database);
             v.adicionar(res.body.id,res.body.produto,res.body.valor,vendas,v.tabela);
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
               
            //    for(var i = 0;i<x.length;i++){
            //         resq.set("ids"+i,x[i].ids);
            //         resq.set("produto"+i,x[i].produto);
            //    }
            //    var objetos = JSON.stringify(x);
            //     resq.set("id",objetos.ids);
            //     resq.set("produto",objetos.produtos);
            //     resq.set("valor",objetos.valor);
             
                db.close();
                const cheerio =  v.cheerio.load("c:/Users/kevin/Desktop/grub_mongodb/www/index.html");
                var teste =  cheerio("<td>"+x[0].valor+"</td>").appendTo(".linha");
                console.log(teste);
                resq.header('Content-type', 'text/html');
                fs.readFile("c:/Users/kevin/Desktop/grub_mongodb/www/index.html",function(err,data){
                   data.write(teste.text());
                   resq.end(data);
                        });
           })
              })   
          }
});

       var httpServer = http.createServer(this.app);
       httpServer.listen(8080,"localhost",function(err){

       });