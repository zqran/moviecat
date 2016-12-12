(function (angular) {
	
	// 首页模块
	angular.module('moviecat.home', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {

			$routeProvider.when('/home_page', {
				// 路径注意：因为这个js文件最终是在index.html中执行的
				// 所以，是相对于 index.html 来计算的路径
				// 并且推荐使用： 绝对路径 （少用 相对路径 ）
				templateUrl: './home/view.html'
			});

		}]);

})(angular); 