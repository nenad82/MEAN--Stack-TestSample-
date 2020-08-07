var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');


var db = mongo.connect("mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb", function(err , response){
    if(err) { console.log(err)}
});
/*
var db = mongo.connect("mongodb://81f5688397be34bba63409c1cdfbb8d7:admin@9a.mongo.evennode.com:27017", function(err , response){
    if(err) { console.log(err)}
});*/

var app = express()
app.use(express.static(__dirname + '/usermanager/dist'));
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/usermanager/dist/index.html'));
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    role: String,
} , {versionKey: false, autoCreate: true});

var User = mongo.model('User' , UsersSchema);

app.post("/api/getUser" , function(req, res){
    User.find({}, function(err , data){
        if(err){
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});

app.post("/api/saveUser" , function(req , res){
    var new_model = new User(req.body);
    new_model.save(function(err, data){
        if(err){
            
            res.send(err);
        }
        else {
            res.send({data: "New user item has been inserted."});
        }
    })
});

app.post("/api/updateUser" , function(req , res){
    User.findByIdAndUpdate(req.body.id , {firstname:req.body.firstname, lastname:req.body.lastname, email: req.body.email, role: req.body.role}, 
        function(err, data){
            if(err){
                res.send(err);
            } else {
                res.send({data:"user item has been updated."});
            }
        });
});

app.post("/api/deleteUser" , function(req , res){
    User.findByIdAndRemove(req.body.id , 
        function(err, data){
            if(err){
                res.send(err);
            } else {
                res.send({data:"user item has been removed."});
            }
        });
});

app.post("/api/findUser" , function(req, res){

    User.find(req.body , function(err, data){
        if(err){
            res.send(err);
        } else {
            res.send(data);
        }

    })
})

var port = process.env.PORT || 8080;
app.listen(port , function() {

})