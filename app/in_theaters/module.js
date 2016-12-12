(function (angular) {
	
	// 创建正在热映模块
	angular.module('moviecat.in_theaters', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			
			$routeProvider.when('/in_theaters', {
				templateUrl: './in_theaters/view.html',
				controller: 'InTheatersController'
			});

		}])
		.controller('InTheatersController', ['$scope', function($scope){
			// 功能 先不实现
		}]);

})(angular); 