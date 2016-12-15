;(function (angular) {
	
	// 创建正在热映模块
	angular.module('moviecat.movie_list', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			
			// :page 表示当前处于多少页，这个参数是可以省略的，如果省略了
			// 默认展示第一页
			// '/search?q={text}'
			// '/coming_soon'
			// '/top250'
			// '/subject/'
			$routeProvider.when('/:movieType/:page?', {
				templateUrl: './movie_list/view.html',
				controller: 'MovieListController'
			});

		}])
		.controller('MovieListController', ['$scope', '$http', '$routeParams', '$route', 'itcastJSONP', 
			function($scope, $http, $routeParams, $route, itcastJSONP){
				// 加载动画，默认展示
				$scope.isLoaded = true;
				// console.log($routeParams.movieType)

				// 如果这个值没有传入，那么默认值为：undefined
				// console.log( $routeParams.page );
				// 实现分页功能
				$scope.pageSize = 5; // 表示当前页展示多少条数据

				// 根据路由获取到当前页数，然后，进行数据的获取
				$scope.curPage = $routeParams.page || 1;
				
				// 每一页的起始值
				var movieStart = ($scope.curPage - 1) * $scope.pageSize;
				// 如何计算总页数？
				// 总条数 / 每页大小
				
				// 通过JSONP获取豆瓣的数据
				itcastJSONP.jsonp('https://api.douban.com/v2/movie/' + $routeParams.movieType, {
					start: movieStart, 
					count: $scope.pageSize,
					// webapi 的服务端只会获取它想要的参数，对于其他额外的参数，是不是影响到现有功能的！
					q: $routeParams.q || ''	// 获取路由的参数，用于搜索功能
				}, function(data) {
						console.log(data);
						$scope.movie = data;
						// 计算总页数
						$scope.totalPages = Math.ceil( data.total / $scope.pageSize );
						
						$scope.isLoaded = false;
						$scope.$apply();
					});

				// 实现上一页和下一页翻页的功能
				$scope.goPages = function(current) {
					// 限制当前页的范围：不能超过最大页数 不能小于1
					// 假设一共有10页面： 最多展示的是第10页，
					if(current <= 0 || current > $scope.totalPages) {
						return;
					}

					$route.updateParams({page: current});
				};
		}]);

})(angular); 