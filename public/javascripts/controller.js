/**
 * Created by Administrator on 2016/5/15.
 */
var container = angular.module('container', []);
/* 头部导航 controller */
container.controller('cart', function ($scope) {
    $scope.carts = false;
    $scope.list = false;
    $scope.shoopList = [];
    $scope.overCart = function () {
        /* 调用商品列表接口 */
        $scope.carts = true;
    };
    $scope.leaveCart = function () {
        $scope.carts = false;
    };
});
/* 搜索导航 controller */
container.controller('search', function ($scope) {
    $scope.border = false;
    $scope.etch = false;
    $scope.isHide = 'display';
    $scope.searchFocus = function () {
        $scope.etch = true;
        $scope.isHide = 'none';
    };
    $scope.searchBlur = function () {
        $scope.etch = false;
        $scope.isHide = 'display';
    };
});
/* 头部导航列表 */
container.controller('navTop', function ($scope, $rootScope, $http) {
    $rootScope.navData = [];
    $rootScope.navList = [];
    var url = "../index/top_nav.json";
    $http.get(url).success(function (data) {
        $rootScope.navData = data.navTop;
    });
});
container.controller('user', function ($scope, $http) {
    $scope.register = function () {
        $scope.user = {
            'username': $scope.username
            /*'password': $scope.password*/
        }
        $http({
            data: $scope.user,
            url: '/register.do',
            method: 'post',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        }).success(function (req, res) {


        }).error(function (req, res) {
            debugger
        })
    }
})

