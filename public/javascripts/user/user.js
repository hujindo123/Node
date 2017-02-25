/**
 * Created by Administrator on 2016/10/23.
 */
var container = angular.module('login', []);
container.controller('login', function ($scope, $http) {
    $scope.login = function () {
        $scope.user = {
            'username': 123
            /*'password': $scope.password*/
        }
        $http({
            data:  $scope.user,
            url: '/user/login.do',
            method: 'post',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        }).success(function (req, res) {
            debugger
        }).error(function (req, res) {
            debugger
        })
    };

});