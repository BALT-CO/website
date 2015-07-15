module.exports = function(App) {
	"use strict";

	console.log ( "details ctrl" );

	App.directive('section', ['$rootScope', function($rootScope) {
		return {
			restrict: 'E',
			link: function($scope, $element, attrs) {
				console.log("ele", $element.attr('id') );
				$element.on( 'webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend' , function() {
					console.log("transition complete", $element.attr('id'), $rootScope.sectionType );
					if ( $element.attr('id') != 'details' && $rootScope.sectionType == 'page' ){
						console.log("details!", $element);
						$element.addClass('hidden');
					} else if ( $element.attr('id') != 'details' && $rootScope.sectionType != 'page' ){
						console.log("not details!", $element);
						$element.removeClass('hidden');
					}
				});
			}
		};
	}]);

	/**
	 * @ngdoc controller
	 * @name boilerplate.controller
	 * @description
	 *
	 */
	App.controller('detailsCtrl', ['$scope', '$rootScope', '$routeParams', 'workSrv', function($scope, $rootScope, $routeParams, workSrv) {
		var data = workSrv.getProjectDetailsByID( $routeParams.name );

		console.log ("detailsCtrl", $routeParams.name, data );

		$scope.client = data.client;
		$scope.campaign = data.campaign;
		$scope.description = data.description;
		$scope.blocks = data.blocks;

		// TODO display correct data in the template

	}]);

	return App;
};
