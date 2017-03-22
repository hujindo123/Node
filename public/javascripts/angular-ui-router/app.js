/**
 * Created by Administrator on 2017/3/22.
 */
//声明AngularJS模块，并把ui-router传入AngularJS模块，所有的结合起来我们就得到Angular模块
var myApp = angular.module('app', ['ui.router']);

//路由引擎传入两个参数$stateProvider和urlRouterProvider
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //如果没有路由引擎没有匹配导航时 默认PageTab.html
    $urlRouterProvider.otherwise("/PageTab");

    $stateProvider
        //这一行定义了会在main页面中第一个显示的状态，作为页面加载好第一个被使用的路由
        .state("PageTab",{
            url: '/PageTab',
            templateUrl: "PageTab",
            controller: 'ShowsDetailController'
        })
        //我们在前面加了前缀并且用.进行分割，这里很关键，它会告诉路由引擎，我们在这里定义了嵌入的状态
        .state("PageTab.Page1",{
            url: '/Page1',
            templateUrl: 'Page1',
            controller: 'Page1'
        })
        .state("PageTab.Page2",{
            url: 'Page2',
            templateUrl: 'Page2'
        })
        .state("PageTab.Page3",{
            url: 'Page3',
            templateUrl: 'Page3'
        })
});
myApp.controller('ShowsDetailController', function ($scope, $http, $sce, $window) {
    $scope.list = ['页面1','页面2','页面3'];//
}).controller('Page1',function ($scope) {
    $scope.list1 = ['页面11','页面12','页面13'];//
})
