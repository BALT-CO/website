module.exports = function(App) {
	"use strict";

	App.directive('details', ['$rootScope', function($rootScope) {
		return {
			restrict: 'A',
      controller: 'detailsCtrl',
			link: function($scope, $element, attrs) {
				console.log("ele:", $element );

			}
		};
	}]);

	return App;
};
