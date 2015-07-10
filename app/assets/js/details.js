module.exports = function(App) {
	"use strict";

	console.log ( "details ctrl" );

	/**
	 * @ngdoc controller
	 * @name boilerplate.controller
	 * @description
	 * 
	 */
	App.controller('detailsCtrl', ['$scope', '$rootScope', '$routeParams', 'workSrv', function($scope, $rootScope, $routeParams, workSrv) {

		
		var data = workSrv.getProjectDetailsByID( $routeParams.name );

		console.log ("detailsCtrl", $routeParams.name, data);

		$rootScope.type = "details";
		$scope.client = data.client;
		$scope.campaign = data.campaign;
		$scope.copy = data.copy;
		$scope.images = data.images;
		$scope.images = data.images;

		// TODO display correct data in the template

	}]);

	return App;
};
