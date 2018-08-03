let mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')

let app = express();
app.use(bodyParser.json());

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database:"test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/customer', function(req,res) {
    
    let sql = "INSERT INTO customer VALUES ("+req.body.cid +",'"+ req.body.name+"','"+req.body.address+"','"+req.body.contact+"')";
    con.query(sql, function (err, result) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send("Saved");
    });
    
});

app.get('/customer', function(req,res) {   
    con.query("SELECT * FROM customer", function (err, result, fields) {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(result);
        }
        
      });  
});

app.put('/customer/:cid', function(req,res) {
    
    let sql = "UPDATE customer SET name='"+req.body.name+"',address='"+req.body.address+"',contact='"+req.body.contact+"' WHERE cid="+req.param('cid')+";"
    con.query(sql, function (err, result) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send("Saved");
    });
    
});

app.get('/customer/:cid', function(req,res) {
    if (!req.param('cid'))
        res.status(400).send("Please send a proper id");
    else {
        con.query("SELECT cid,name,address,contact FROM customer WHERE cid="+req.param('cid')+";", function (err, result, fields) {
            if (err){
                res.status(500).send(err);
            }else{
                res.status(200).send(result);
            }
            
          });  
    }
});

app.delete('/customer/:cid', function(req,res) {
    if (!req.param('cid'))
        res.status(400).send("Please send a proper id");
    else {
        con.query("DELETE FROM customer WHERE cid="+req.param('cid')+";", function (err, result, fields) {
            if (err){
                res.status(500).send(err);
            }else{
                res.status(200).send("Delete");
            }
            
          });  
    }
});

app.listen(3000,()=>{
    console.log('server is running in port 3000');
});

