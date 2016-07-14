/**
 * Created by Administrator on 2016/7/10.
 */
function getMyconnection(){
    var myconnection =mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"test"
    });
    return myconnection;
}
