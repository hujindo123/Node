/**
 * Created by Administrator on 2017/2/23.
 */
var request = require('request');
var http = require("http");
module.exports ={
    search: function (req, res, next) {
        var searchName = encodeURI(req.body.searchName);
        /* s：搜索的内容
         offset：偏移量（分页用）
         limit：获取的数量
         type：搜索的类型*/
        /*歌曲 1
         专辑 10
         歌手 100
         歌单 1000
         用户 1002
         mv 1004
         歌词 1006
         主播电台 1009
         */
        var opt = {
            headers: {
                'Referer': 'http://music.163.com/',
                'Cookie': 'appver=1.5.0.75771'
            },
            host: 'music.163.com',
            path: '/api/search/pc?type=1&s='+searchName+'&limit=10&offset=5', //suggest/web
            method: 'post'
        };
        var body = '';
        var req = http.request(opt, function (datas) {
            console.log("Got response: " + datas.statusCode)
            datas.on('data', function (d) {
                body += d;
            }).on('end', function () {
                res.send(body)
            });
        }).on('error', function (e) {
            console.log("Got error1: " + e);
        });
        req.end();
    },
    searchUrl: function (req, res, next) {
        var songId = req.body.songId;
        /*
         * 必要参数：
         id：歌曲ID
         ids：不知道干什么用的，用[]括起来的歌曲ID
         * */
        var opt = {
            headers: {
                'Referer': 'http://music.163.com/',
                'Cookie': 'appver=1.5.0.75771'
            },
            host: 'music.163.com',
            path: "/api/song/detail/?id="+songId+"&ids=["+songId+"]",
            method: 'get'
        };
        var body = '';
        var req = http.request(opt, function (datas) {
            console.log("Got response: " + datas.statusCode)
            datas.on('data', function (d) {
                body += d;
            }).on('end', function () {
                res.send(body)
            });
        }).on('error', function (e) {
            console.log("Got error1: " + e);
        });
        req.end();
    }
}