;(function (angular) {
	
	// 创建正在热映模块
	angular.module('moviecat.top250', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			
			// :page 表示当前处于多少页，这个参数是可以省略的，如果省略了
			// 默认展示第一页
			$routeProvider.when('/top250/:page?', {
				templateUrl: './top250/view.html',
				controller: 'Top250Controller'
			});

		}])
		.controller('Top250Controller', ['$scope', '$http', '$routeParams', '$route', 'itcastJSONP', 
			function($scope, $http, $routeParams, $route, itcastJSONP){
				// 如果这个值没有传入，那么默认值为：undefined
				// console.log( $routeParams.page );
				// 实现分页功能
				$scope.pageSize = 5; // 表示当前页展示多少条数据

				// 根据路由获取到当前页数，然后，进行数据的获取
				$scope.curPage = $routeParams.page || 1;
				// console.log($scope.curPage)
				// $scope.curPage = 1;	 // 表示当前处于第几页
				// 第一页：0 1 2 3 4			==> 0 (1 - 1) * 5
				// 第二页：5 6 7 8 9		  ==> 5 (2 - 1) * 5
				// 第三页：10 11 12 13 14 ==> 10 (3 - 1) * 5
				
				// 每一页的起始值
				var movieStart = ($scope.curPage - 1) * $scope.pageSize;
				// 如何计算总页数？
				// 总条数 / 每页大小
				
				// 通过JSONP获取豆瓣的数据
				itcastJSONP.jsonp('https://api.douban.com/v2/movie/top250', 
					{start: movieStart, count: $scope.pageSize}, function(data) {
						console.log(data);
						$scope.movie = data;
						// 计算总页数
						$scope.totalPages = Math.ceil( data.total / $scope.pageSize );

						$scope.$apply();
					});

				// 实现上一页和下一页翻页的功能
				$scope.goPages = function(current) {
					// 限制当前页的范围：不能超过最大页数 不能小于1
					// 假设一共有10页面： 最多展示的是第10页，
					if(current <= 0 || current > $scope.totalPages) {
						return;
					}

					// 因为路由发生了改变，会导致路由对应的控制器中的代码，重新执行一遍
					// 控制器中会重新给 $scope.curPage 重新赋值！ 因为这个赋值操作可以省略
					// 
					// current 表示传递过来的当前页
					// $scope.curPage = current;

					// 作用：通过调用这个方法，来更新路由中的路由参数
					// 			 方法的参数是一个对象 对象的属性是路由中配置好的路由参数
					// 			 在我们的例子中就是： page
					$route.updateParams({page: current});

					// angular框架的一个默认行为：
					// 只要路由的参数发生了改变，就会重新执行相应控制器中的代码！
				};

				/*$http({metod: 'GET', url: './top250/data.json'})
				.then(function(response) {
					$scope.movie = response.data;
				}, function() {});*/
		}]);

})(angular); 