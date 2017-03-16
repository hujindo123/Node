var express = require('express');

var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', {title: '首页' });
});
router.post('/register.do',function (req,res) {
console.log(req.body.username)
   var myConnection = getMyconnection();
    myConnection.connect();
    myConnection.query("select password from user where username=?",[req.body.username],function(err,data){
        data = [1,2,3,4,5]
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
