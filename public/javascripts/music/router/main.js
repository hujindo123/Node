/**
 * Created by Administrator on 2017/4/10.
 */
var song = angular.module('song');
song.controller('song', function ($scope, $http, $sce, $window) {

});
song.controller('localStorageList', function ($scope, $http, $sce, $window, $timeout,  $stateParams) {
    /* 搜索过的歌曲 */
    if (localStorage.getItem('searchList')) {
        $scope.listSong = localStorage.getItem('searchList').split(',');
        $scope.list = [];
        for (var i = 0; i < $scope.listSong.length; i++) {
            $scope.list.push(
                {name: $scope.listSong[i].split('&&')[0], id: $scope.listSong[i].split('&&')[1]}
            )
        }
    }
    /* 热搜索 */
    $scope.hotSearch = function () {
        $http({
            method: "POST",
            url: "/hotsearch",
        }).success(function (data, status) {
            $scope.hostSearch = data;

        }).error(function (data, status) {
        });
    };
    /* 删除某一条缓存 */
    $scope.removeList = function ($index) {
        /*localStorage.removeItem(localStorage.key($index));*/
        $scope.removesongs = '';
        $scope.list.splice($index, 1);
        for (var i = 0; i < $scope.list.length; i++) {
            $scope.removesongs += $scope.list[i].name + '&&' + $scope.list[i].id;
        }
        localStorage.setItem('searchList', $scope.removesongs);
    };
    //输入框获取焦点
    $scope.songs = [];//歌曲列表
    $scope.searchName = '';
    /* 搜素功能 */
    $scope.searchSongId = function (searchName) {
        searchName ? $scope.searchName = searchName : $scope.searchName;
        if(searchName.length == 0){
            $scope.show = true;
            $scope.hotSearch();
            return;
        }
      /*  $scope.show = true;*/
        $http({
            method: "POST",
            url: "/search",
            data: {'searchName': $scope.searchName}
        }).success(function (data, status) {
            $scope.songs = data.result.songs; //搜索到的歌曲数组
            $scope.show = false;
            //localStorage.setItem('songs', JSON.stringify(data.result.songs));
        }).error(function (data, status) {

        })
    };
    /* 是播放时返回的 */
    if($stateParams.searchName){
        $scope.searchSongId($stateParams.searchName)
    }else {
        $scope.show = true;
        /* 热门搜索 */
        $scope.hotSearch();
    }
});
song.controller('play', function ($scope, $http, $sce, $location, $interval, $stateParams) {
    /* 搜索歌曲地址 */
    $scope.searchName = $stateParams.searchName;
    $scope.searchSongUrl = function () {
        $http({
            method: "POST",
            url: "/searchUrl",
            data: {'songId': $stateParams.id}
        }).success(function (data, status) {
            /* 缓存 */
            if (data.songs[0].name.indexOf('（') != -1 || data.songs[0].name.indexOf('【') != -1) {
                data.songs[0].name = data.songs[0].name.split('（')[0];
                data.songs[0].name = data.songs[0].name.split('【')[0];
                data.songs[0].name = data.songs[0].name.split('？')[0];
            }
            $scope.searchList = [data.songs[0].name + '&&' + data.songs[0].id];
            localStorage.setItem('searchList', localStorage.getItem('searchList') + ',' + $scope.searchList);
            $scope.playMusic(data.songs);
        }).error(function (data, status) {
            debugger
        })
    };
    $scope.searchSongUrl();
    /* 歌曲播放  */
    $scope.playMusic = function (data) {

        $scope.artistsName = data[0].artists[0].name; //歌手名称
        $scope.songBack = data[0].album.blurPicUrl; //默认背景*/
        $scope.songName = data[0].name; //歌曲名称*/



        $scope.off = false; //默认未播放
        $scope.songUrl = $sce.trustAsResourceUrl(data[0].mp3Url);
        $scope.runDuration = '00:00';
        $scope.runWidth = 0;
       /* $scope.duration = new Date(data[0].duration).Format("mm:ss");*/
        /* 454000*/
        $scope.songBacks = {
            "background-image": 'url(' + $scope.songBack + ')',
        }
        var audio ="";
        audio= new Audio($scope.songUrl);
        audio.play();
        $scope.runTime = 0;
    }

/*    $scope.searchSongUrl($stateParams.id);*/


    /* 拉动快进 */
    $scope.rangeChange = function (runWidth) {
        $scope.runTime = $scope.answer.duration * (runWidth / 100);
        audio.currentTime = ($scope.runTime / 1000).toFixed(0);
    };
    /* 播放开关 */
    $scope.offButon = function () {
        $scope.off ? $scope.off = false : $scope.off = true;
        if ($scope.off) {
            audio.play();
            $scope.timer = setInterval(function () {
                $scope.runTime >= $scope.answer.duration ? clearInterval($scope.timer) : $scope.runTime += 1000;
                $scope.runDuration = $scope.runTime;
                $scope.$apply(function () {
                    $scope.runDuration = new Date($scope.runDuration).Format("mm:ss");
                });
                var range = (($scope.runTime / $scope.answer.duration) * 100).toFixed(0);
                $scope.runWidth = range;
                $scope.runValueTime = ($scope.runTime / $scope.answer.duration) * 100;
            }, 1000);
        } else {
            clearInterval($scope.timer);
            audio.pause();
        }
    };
    /* 下一首 */
    $scope.nextSongs = function () {

    };

    $scope.playShow = true;
})


