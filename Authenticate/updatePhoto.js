const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require("path");
const fs = require('fs')
// connect to database
var db=require("../dataBase/dataBaseConnection");
var img =''
router.post("/",
multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"));
      },
      filename: (req, file, cb) => {
          img = Date.now() + "-" + file.originalname
        cb(null, img);
      },
    }),
  }).single("image")
  , function(req,res){
      db.query('select * from `users` where id = ' +'"'+req.body.userId+'"' ,function (err, dbresult){
    if (err){
        res.send(err);
    }else{
        if(fs.existsSync(path.join(__dirname, "../public/images/"+dbresult[0].image))){
            fs.unlinkSync(path.join(__dirname, "../public/images/"+dbresult[0].image))
        }
        db.query("update `users` set image='"+img +"' where id='"+req.body.userId+"'",
            function(err,result){
                        if(err){
                            res.status(400)
                            res.send(err)
                        }
                        else{
                            console.log("success")
                            res.send(img)
                        }
                    })
            }
        })
    }
);
// router.get('/user/:userName',function(req,res){
//     console.log(req.params.userName)
//     db.query('select * from `users` where userName = ' +'"'+req.params.userName+'"' ,function (err, dbresult){
//         if (err){
//             res.send(err);
//         }else{
//             console.log(dbresult[0])
//             res.send(dbresult[0])
//         }
//     })
// })

router.get('/user/:id',function(req,res){
    console.log(req.params.id);
    var sql = "SELECT * from `users` where id = " + req.params.id ;
    console.log(sql);
    db.query(sql, function (err, result) {
        if (err){
            console.log("eeroror:  ", err);
            res.send(err);
        }else{
            console.log(result)
            res.send(result[0])
        }
    })
})
module.exports= router;