var dbconn = require('../data/dbconnection.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("jsonwebtoken");

//regisztráció
module.exports.register = function(req,res){

    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    var db = dbconn.get();
    var users = db.collection("users");
    //Hibakeresés
    if(!(username && password)){
        console.log("nincs megadva midnen szükséges mező");
        res.status(400).send("nincs megadva midnen szükséges mező");
        return;
    }
    //ellenőrizzük hogy foglalt-e a felhasználónév
    users.findOne({username : username},function(err,found){
        if(found){
            res.status(409).json("Foglalt username");
        }else{
            //Ha ne makkor újat szúrunk be
            users.insertOne({
                username : username,
                name : name,
                logCount : 0,
                password: bcrypt.hashSync(password,bcrypt.genSaltSync(10))
                },function(err,user){
                    if(err) {
                        console.log(err);
                        res.status(400).json(err);
                    }else{
                        //ha ez sikerült akkor tokent generálunk és visszaadjuk a válaszban
                       console.log('user created ',username);
                       var token = jwt.sign({ username: user.username},'s3cr3t',{expiresIn : 3600});
                       //növeljük a felhasználó bejelentkezéseinek számát
                       users.update({username : username},{$inc : {logCount : 1}});
               
                       res.status(201).json({success : true, token: token});
                    }
                });
        }
    })

    
};

module.exports.login = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    //hiba keresés
    if(!(username && password)){
        console.log("nincs megadva midnen szükséges mező");
        res.status(400).send("nincs megadva midnen szükséges mező");
        return;
    }
    var db = dbconn.get();
    var users = db.collection("users");
    console.log(username);
    //megkeressük a user-t
    users.findOne({username: username},function(err,user){
        if(user == null){
            console.log("invalid username");
            res.status(400).json("invalid username");
        } else{
            //ellenőrizzük a jelszó helyességét
        if(bcrypt.compareSync(password,user.password)){
        console.log('User ' + username + " logged in");
        //token generálás
        var token = jwt.sign({ username: user.username},'s3cr3t',{expiresIn : 3600});
        //növeljük a felhasználó bejelentkezéseinek számát
        users.update({username : username},{$inc : {logCount : 1}});
        //Ha minden helyes visszaadjuk a váálaszban a tokent
        res.status(200).json({success : true, token: token});
        } else{
            //Rossz jelszó esetén 401 es hibakód
            res.status(401).json("Unauthorized");        }
        
        }
    });
};
//autentikáció
module.exports.authenticate = function(req,res,next){
var headerExists = req.headers.authorization;
//alternatív bejelentkezési lehetőség tesztelési céllal
if(req.headers.kiskapu && req.headers.kiskapu == "alma")
    next();
else{ 
if(headerExists){
    var token;
    // if(req.headers.kiskapu){
    //     token = req.headers.kiskapu.split(' ')[1];
    // }else
    //Token felbontása
    token = req.headers.authorization.split(' ')[1];
    //Token hitelességének ellenőrzése
    jwt.verify(token,'s3cr3t',function(error,decoded){
        if(error){
            //sikertelen hitelesítés
            res.status(401).json('Unauthorized');
        }else {
            //sikeres hitelesítés
            req.user = decoded.username;
            next();
        }
    })
}else {
    //Ha nincs token hiba dobása
    res.status(401).json('No token provided')
}
}
};

