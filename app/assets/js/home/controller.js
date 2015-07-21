module.exports = function(App) {
	"use strict";

	/**
	 * @ngdoc controller
	 * @name boilerplate.controller.workButtonCtrl
	 * @description
	 * @param $scpoe {Object} :
	 * @param $attrs {Object} :
	 */
	App.controller('homeButtonCtrl', ['$scope', '$attrs', '$location', '$element', function($scope, $attrs, $location, $element) {
		$scope.pic = $element.find("picture");

		$scope.openWork = function ( name ) {
			$location.path( name );
		};

		$scope.out = function(e) {
			// var style = "translate3d(0px,0px, 0px)";
			// $element.find("picture").css({
			//     "-webkit-transform": style,
			//     "transform": style,
			//     "moz-transform": style
			// });
		};

		$scope.over = function(e) {
		};

		$scope.move = function(e) {
			var width = $element[0].offsetWidth,
				height = $element[0].offsetHeight,
				field = 5,
				mouseX = .2 - e.offsetX / width,
				mouseY = .2 - e.offsetY / height,
				style = "translate3d(" + Math.round(mouseX * field) + "px," + Math.round(mouseY * field) + "px, 0px)";
			$scope.pic.css({
				"-webkit-transform": style,
				"transform": style,
				"moz-transform": style
			});
		};

	}]);

	return App;
};
