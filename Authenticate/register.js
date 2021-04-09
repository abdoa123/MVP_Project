const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var cors = require('cors');

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
    await jwt.sign({ user: user }, 'secretkey', (err, token) => {
        user["tocken"] = token;
    });
    console.log(req.body);
    //hash Password
    var newHash = await bcrypt.hash(req.body.password, 10);

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

                    res.send("1 record inserted")
                }

            });

        }
        else {
            console.log("ads");
            res.send("user Already Exist");
        }
    });
    console.log(chee);


});

module.exports = router;