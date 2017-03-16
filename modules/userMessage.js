/**
 * Created by Administrator on 2017/3/15.
 */
var formidable = require('formidable');
var path = require('path');
var query = require('../DB/db');
module.exports = {
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
                   res.redirect('/login');
                });
        })
    }
}