(function(angular) {
  // "use strict";

  // start your ride
  // 主模块，所有其他的模块，都由主模块统一处理
  angular.module('moviecat', [
      'moviecat.home',
      'moviecat.movie_list',
      /*'moviecat.in_theaters',
      'moviecat.coming_soon',
      'moviecat.top250',*/
      'moviecat.jsonp',
      'moviecat.autoActive'
    ]);

})(angular);
