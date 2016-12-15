(function (angular) {
	
	// 创建自动获得焦点的自定义指令
	angular.module('moviecat.autoActive', [])
		.directive('autoActive', ['$location', function($location) {

			return {

				link: function(scope, element) {
					// 根据url，获取url的参数，然后，与当前元素的子元素a的href属性进行匹配
					// 如果匹配成功了，就给当前元素添加类
					// 
					// 可以通过 $location.url() 获取到url的值
					// 要目：只要url的值发生了变化，样式就要重新计算
					scope.location = $location;

					scope.$watch('location.url()', function(newValue) {
						// console.log(newValue);
						// a标签中的内容： #/in_theaters
						// url： /in_theaters
						var aLink = element.children().attr('href');
						// console.log(aLink)
						if(aLink.indexOf(newValue) > -1) {
							element.parent().children().removeClass('active');
							element.addClass('active');
						}
					});


					/*// 通过排他思想，给当前元素添加类，让兄弟元素移除类
					element.on('click', function() {
						// console.log('事件执行了')
						// 1 清除所有的样式，通过当前元素获取到父元素，再获取父元素的子元素
						element.parent().children().removeClass('active');
						// 2 给自己添加样式
						element.addClass('active');
					});*/
				}
			};
		}]);

})(angular)