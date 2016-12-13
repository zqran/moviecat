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
				// 实现分页功能
				$scope.pageSize = 5; // 表示当前页展示多少条数据
				$scope.curPage = 1;	 // 表示当前处于第几页
				// 第一页：0 1 2 3 4			==> 0 (1 - 1) * 5
				// 第二页：5 6 7 8 9		  ==> 5 (2 - 1) * 5
				// 第三页：10 11 12 13 14 ==> 10 (3 - 1) * 5
				
				// 每一页的起始值
				var movieStart = ($scope.curPage - 1) * $scope.pageSize;
				// 如何计算总页数？
				// 总条数 / 每页大小
				
				// 通过JSONP获取豆瓣的数据
				itcastJSONP.jsonp('https://api.douban.com/v2/movie/coming_soon', 
					{start:movieStart, count: $scope.pageSize}, function(data) {
						console.log(data);
						$scope.movie = data;
						// 计算总页数
						$scope.totalPages = Math.ceil( data.total / $scope.pageSize );

						$scope.$apply();
					});

				/*$http({metod: 'GET', url: './in_theaters/data.json'})
				.then(function(response) {
					$scope.movie = response.data;
				}, function() {});*/
		}]);

})(angular); 