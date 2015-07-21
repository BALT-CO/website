module.exports = function(App) {
	"use strict";

	App.directive('homebutton', function() {
		return {
			restrict: 'A',
			// controller: 'homeButtonCtrl',
			link: function($scope, $element, attrs) {

			}
		};
	});

	return App;
};
