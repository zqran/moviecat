(function (angular) {
	
	// 创建正在热映模块
	angular.module('moviecat.coming_soon', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			
			$routeProvider.when('/coming_soon', {
				templateUrl: './coming_soon/view.html',
				controller: 'ComingSoonController'
			});

		}])
		.controller('ComingSoonController', ['$scope', function($scope){
			// 功能 先不实现
		}]);

})(angular); 