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
})


container.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
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
            $scope.$watch(function () {
                $scope.list = req;
            })
            var datacolor = ['#0bd192', '#4eaef8', '#F84E20','#F817E0','#0bd192',];
            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                //下面是在table render完成后执行的js
                $('.indicatorContainer').each(function (i, n) {
                    n = $(n);
                    n.radialIndicator({
                        radius: 85,
                        barBgColor: '#e7e7e7',
                        barColor: datacolor[i],
                        fontColor: '#ff9600',
                        fontSize: '50',
                        fontFamily: '微软雅黑',
                        fontWeight: '100',
                        barWidth: 16,
                        initValue: 0,
                        roundCorner: false,
                        //percentage: false,
                        displayNumber: false,
                      
                    });
                    var radialObj = n.data('radialIndicator');
                    radialObj.animate((i+1)*10);
                });

            });

        }).error(function (req, res) {
            debugger
        })
    }
})

