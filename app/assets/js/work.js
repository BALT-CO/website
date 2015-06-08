module.exports = function(App) {
	"use strict";

	console.log ( "WORK" );

	/**
	 * @ngdoc controller
	 * @name boilerplate.controller.workButtonCtrl
	 * @description 
	 * @param $scpoe {Object} : 
	 * @param $attrs {Object} : 
	 */
	App.controller('workButtonCtrl', ['$scope', '$attrs', '$location', function($scope, $attrs, $location) {
		console.log ( "workButtonCtrl", $attrs.name );
		$scope.openWork = function ( name ) {
			console.log (" HIHI ", name );
			$location.path( name );
		};
	}]);

	return App;
};
