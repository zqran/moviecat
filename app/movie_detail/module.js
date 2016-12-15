(function (angular) {
		
		// 电影详情页模块
		angular.module('moviecat.details', ['ngRoute'])
			.config(['$routeProvider',function($routeProvider) {
				// 因为我们要在控制器中发送请求获取电影的详细信息
				$routeProvider.when('/details/:id?', {
					templateUrl: './movie_detail/view.html',
					controller: 'DetailController'
				})
			}])
			.controller('DetailController', ['$scope', '$routeParams', 'itcastJSONP',
				function($scope, $routeParams, itcastJSONP){
					
					// 获取到当前电影信息的id值
					var id = $routeParams.id;
					itcastJSONP.jsonp('https://api.douban.com/v2/movie/subject/' + id, {}, 
						function(data) {
							$scope.movieDetail = data;
							console.log(data);

							$scope.$apply();
						});

			}]);

})(angular)