;(function (angular) {
	
	// 创建正在热映模块
	angular.module('moviecat.in_theaters', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			
			$routeProvider.when('/in_theaters', {
				templateUrl: './in_theaters/view.html',
				controller: 'InTheatersController'
			});

		}])
		.controller('InTheatersController', ['$scope', '$http', 'itcastJSONP', 
			function($scope, $http, itcastJSONP){
				
				// 通过JSONP获取豆瓣的数据
				itcastJSONP.jsonp('https://api.douban.com/v2/movie/coming_soon', 
					{start:0, count: 5}, function(data) {
						console.log(data);
						$scope.movie = data;

						$scope.$apply();
					});
		}]);

})(angular); 