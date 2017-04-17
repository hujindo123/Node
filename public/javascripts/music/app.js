/**
 * Created by Administrator on 2017/3/22.
 */
//声明AngularJS模块，并把ui-router传入AngularJS模块，所有的结合起来我们就得到Angular模块
var myApp = angular.module('song', ['ui.router']);
//路由引擎传入两个参数$stateProvider和urlRouterProvider
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //如果没有路由引擎没有匹配导航时 默认PageTab.html
    $urlRouterProvider.otherwise("/musicMain");

    $stateProvider
        //这一行定义了会在main页面中第一个显示的状态，作为页面加载好第一个被使用的路由
        .state("musicMain",{
            url: '/musicMain',
            templateUrl: "musicMain",
            controller: 'song'
        })
        //我们在前面加了前缀并且用.进行分割，这里很关键，它会告诉路由引擎，我们在这里定义了嵌入的状态
        .state("getSearch",{
            url: '/getSearch',
            templateUrl: 'getSearch',
            controller: function ($state) {
                $state.go('getSearch.list');
            }
        })
        .state('getSearch.list',{
            params:{id:null,name: null,searchName: null},
            url: '/list',
            templateUrl: 'list',
            controller: 'localStorageList'
        })
        .state("getSearch.searchList",{
            url: '/searchList',
            templateUrl: 'searchList',
            controller: 'localStorageList'
        })
        .state("playPage",{
            params:{id:null,name: null,searchName: null},
            url: '/playPage',
            templateUrl: 'playPage',
            controller: 'play'
        })
});
