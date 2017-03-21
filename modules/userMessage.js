/**
 * Created by Administrator on 2017/3/15.
 */
var formidable = require('formidable');
var path = require('path');
var captchapng = require('captchapng');//生成图片验证
var query = require('../DB/db');
module.exports = {
    getPic: function (req, res, next) {
        var code = '0123456789';
        var length = 4;
        var randomcode = '';
        for (var i = 0; i < length; i++) {
            randomcode += code[parseInt(Math.random() * 1000) % code.length];
        }
        //输出图片
        var p = new captchapng(50,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
        p.color(255, 255, 255, 0); // First color: background (red, green, blue, alpha)
        p.color(80,80,80,255);// Second color: paint (red, green, blue, alpha)
        var img = p.getBase64();
        /*var imgbase64 = new Buffer(img, 'base64');*/
        res.writeHead(200, {
            'Content-Type': 'image/png',
        })
        res.end(img);
    },
    addMessage: function (req, res, next) {
        var form = new formidable.IncomingForm(); //创建新的传入表单。
        form.encoding = 'utf-8'; //设置传入表单字段的编码
        form.uploadDir = "img_dir"; //上传文件的保存路径
        form.keepExtensions = true;//保存扩展名
        form.maxFieldsSize = 20 * 1024 * 1024; //上传文件的最大大小
        form
            .on('progress', function (bytesReceived, bytesExpected) {
                //console.log(bytesReceived, bytesExpected)
            })
            .on('end', function () {
                /*  res.redirect('/login');*/
            });
        form.parse(req, function (err, fields, files) {
            console.log(fields, files)
            const username = fields.title;
            const password = fields.singer;
            const headImg = files.img.path;
            if (err) {
                throw err;
            }
            query("insert into user(username, password, headImg) values(?,?,?)",
                [username, password, headImg],
                function (err, rows, fields) {
                    if (err) throw err;
                    req.session.user = username;
                   res.redirect('/login');
                });
        })
    }
}