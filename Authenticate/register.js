const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var cors = require('cors')
const validator = require('validator')

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
    var errors= {};
    if (!validator.isLength(req.body.userName, {
        min: 2,
        max: 30
    })) {
    errors.userName = 'Username should be between 2 and 30 characters'
}
if (validator.isEmpty(req.body.userName)) {
    errors.userName = 'Username is required'
}
if (validator.isEmpty(req.body.Password)) {
    errors.Password = 'Password is required'
}
if (!validator.isLength(req.body.Password, {
        min: 6,
        max: 30
    })) {
    errors.Password = 'Password should be at least 6 characters'
}
if (!validator.isEmail(req.body.Email)){
errors.Email = 'the email is not vaild';
}

var j=JSON.stringify(errors);  
console.log(j.length);
if(j.length>2){
    res.json(errors)
}else{
    //create Token
    await jwt.sign({ user: user }, 'secretkey', (err, token) => {
        user["tocken"] = token;
    });
    //hash Password
    var newHash = await bcrypt.hash(req.body.Password, 10);
    console.log(newHash);
    //check if Exist
    let c = await db.query("select * from `users` where userName ='" + req.body.userName + "';", function (err, result) {
        if (err) {
            console.log("err")
        }
        if (result.length === 0) {
            console.log("lllllllllllllllll" + result);

            let a = db.query("INSERT INTO `users` (userName, hash,Email, Token ) VALUES  ('" + req.body.userName + "'," + "'" + newHash + "'" + ",'" + req.body.Email + "'," + "'" + user["tocken"] + "'" + ");", function (err1, result2) {
                if (err1) {
                    console.log(err1)
                } else {

                    res.send({message : "1 record inserted"})
                }

            });

        }
        else {
            console.log("ads");
            res.send({message : "user Already Exist"});
        }
    });
    console.log(chee);

}
});

module.exports = router;