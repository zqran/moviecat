(function(angular) {
  // "use strict";

  // start your ride
  // 主模块，所有其他的模块，都由主模块统一处理
  angular.module('moviecat', [
      'moviecat.home',
      // 因为这个路由规则，需要优先被匹配，所以，需要先引入！
      'moviecat.details',
      'moviecat.movie_list',
      /*'moviecat.in_theaters',
      'moviecat.coming_soon',
      'moviecat.top250',*/
      'moviecat.jsonp',
      'moviecat.autoActive'
    ])
    .controller('MainController', ['$scope', '$location', function($scope, $location) {
      $scope.query = '';

      // 用来进行电影搜索
      $scope.search = function() {
        // $location.url() 不传入参数表示获取url地址
        //                  传入参数，表示设置url
        $location.url('/search?q=' + $scope.query);
      };
    }])

})(angular);
