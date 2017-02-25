/**
 * Created by Administrator on 2016/11/2.
 */
var fs = require('fs');
 fs.readFile('../../index/top_nav.jsons',function (err, data) {
     if(err) throw err;
     console.log(data.toString());
 });