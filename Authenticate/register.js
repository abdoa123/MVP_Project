const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var cors = require('cors')

var db = require("../dataBase/dataBaseConnection");
const { token } = require('morgan');
const e = require('express');
app = express();
app.use(cors());



app.use(bodyParser);
var user = {
    tocken: "",
    userName: "",
    password: "",
}
var chee = false;
router.post('/signup', async function (req, res) {
    //create Token
     jwt.sign({ user: user }, 'secretkey', (err, token) => {
        user["tocken"] = token;
    });
    //hash Password
    var newHash = await bcrypt.hash(req.body.Password, 10);
    console.log(newHash);
    //check if Exist
    let c =  db.query("select * from `users` where userName ='" + req.body.userName +"'"+ " or Email = " +"'"+req.body.Email + "'" , function (err, result) {
        if (err) {
            console.log(err)
        }else{
        if (result.length === 0) {
            console.log("asd")
            let a = db.query("INSERT INTO `users` (userName, hash,Email, Token ) VALUES  ('" + req.body.userName + "'," + "'" + newHash + "'" + ",'" + req.body.Email + "'," + "'" + user["tocken"] + "'" + ");", function (err1, result2) {
                if (err1) {
                    console.log("xfxfg",err1)
                } else {
                    console.log("abdo")
                    res.send({message : "1 record inserted"})
                }

            });

        }
        else {
            console.log("ads");
            res.send({message : "userName or Email Already Exist"});
        }
    }
    });
    console.log(chee);


});

module.exports = router;