(function (angular) {
	
	// 创建正在热映模块
	angular.module('moviecat.in_theaters', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			
			$routeProvider.when('/in_theaters', {
				templateUrl: './in_theaters/view.html',
				controller: 'InTheatersController'
			});

		}])
		.controller('InTheatersController', ['$scope', '$http', function($scope, $http){
			// 功能 先不实现
			// 数据应该是从 豆瓣电影API 中获取到
			
			// Promise ES6 中提到一个解决 回调地狱 的问题
			
			// 1 使用本地json文件模拟数据的获取
			// 		angular中通过服务 $http 来发送ajax请求
			$http({
				method: 'GET',
				url: './in_theaters/data.json'
			}).then(function(response) {
				// ajax请求发送成功的回调函数
				// console.log('成功！')
				console.log(response)
				$scope.movie = response.data;
			}, function(response) {
				// 失败的函数
				console.log('失败！')
				console.log(response)
			});

			/*$http.get('./in_theaters/data.json')
					 .success(function(response) {
					 	console.log(response)
						$scope.movie = response;
					 })
					 .error(function(res){})*/

		}]);

})(angular); 