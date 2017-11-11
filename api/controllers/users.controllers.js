var dbconn = require('../data/dbconnection.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("jsonwebtoken");

module.exports.register = function(req,res){

    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    var db = dbconn.get();
    var users = db.collection("users");
    if(!(username && password)){
        console.log("nincs megadva midnen szükséges mező");
        res.status(400).send("nincs megadva midnen szükséges mező");
        return;
    }
    users.findOne({username : username},function(err,found){
        if(found){
            res.status(409).json("Foglalt username");
        }else{
            users.insertOne({
                username : username,
                name : name,
                password: bcrypt.hashSync(password,bcrypt.genSaltSync(10))
                },function(err,user){
                    if(err) {
                        console.log(err);
                        res.status(400).json(err);
                    }else{
                        
                       console.log('user created ',user);
                        res.status(201).json('user created');
                    }
                });
        }
    })

    
};

module.exports.login = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    if(!(username && password)){
        console.log("nincs megadva midnen szükséges mező");
        res.status(400).send("nincs megadva midnen szükséges mező");
        return;
    }
    var db = dbconn.get();
    var users = db.collection("users");
    console.log(username);
    users.findOne({username: username},function(err,user){
        if(user == null){
            console.log("invalid username");
            res.status(400).json("invalid username");
        } else{
        if(bcrypt.compareSync(password,user.password)){
        console.log('User found in');
        var token = jwt.sign({ username: user.username},'s3cr3t',{expiresIn : 3600});

        res.status(200).json({success : true, token: token});
        } else{
            res.status(401).json("Unauthorized");        }
        
        }
    });
};

module.exports.authenticate = function(req,res,next){
var headerExists = req.headers.authorization;
if(headerExists){
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,'s3cr3t',function(error,decoded){
        if(error){
            res.status(401).json('Unauthorized');
        }else {
            req.user = decoded.username;
            next();
        }
    })
}else {
    res.status(401).json('No token provided')
}
};
