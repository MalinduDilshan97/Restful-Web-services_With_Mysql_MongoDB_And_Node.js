const express = require('express');
const bodyParser = require('body-parser')
const {MongoClient,ObjectID} = require('mongodb');

let app = express();
app.use(bodyParser.json());

let db;

MongoClient.connect('mongodb://localhost:27017/mongotest',{ useNewUrlParser: true },(err,client)=>{
    if(err){
        return console.log("Error with connecting the server");
    } else {
        console.log('Connection Successfull');
        db = client.db('mongotest');
    }
    
});



app.post('/customer', function(req,res) {
    let doc={name:req.body.name,address:req.body.address,contact:req.body.contact}
    db.collection("customer").insertOne(doc,(err,result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send("Saved");
        }
    })

});

app.get('/customer', function(req,res) {
    
    db.collection("customer").find({}).toArray(function(err, result) {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(result);
        }
      });
       
});

app.get('/customer/:_id', function(req,res) {
    let id=req.param('_id')
    db.collection("customer").findOne({_id:new ObjectID(id)},function(err, result) {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(result);
        }
      });

});

app.put('/customer/:id', function(req,res) {
    let id=req.param('id');
    let newvalues = { $set: {name: req.body.name, address:req.body.address, contact:req.body.contact } };
    db.collection("customer").updateOne({_id:new ObjectID(id)}, newvalues, function(err, result) {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send("Updated");
        }
    });
});

app.delete('/customer/:id', function(req,res) {
    let id=req.param('id');
    db.collection("customer").deleteOne({_id:new ObjectID(id)}, function(err, obj) {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send("Deleted");
        }
    });
});


app.listen(3000,()=>{
    console.log('server is running in port 3000');
});