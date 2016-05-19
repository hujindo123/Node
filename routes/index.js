var express = require('express');
var mysql = require("mysql");
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});
router.post('/register.do',function (req,res) {
   var myConnection = getMyconnection();
    myConnection.connect();
    myConnection.query("select password from user where username=?",[req.body.username],function(err,data){
        res.send(data);
        res.end();
        myConnection.end();
    });
});

function getMyconnection(){
    var myconnection =mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"test"
    });
    return myconnection;
}

module.exports = router;
