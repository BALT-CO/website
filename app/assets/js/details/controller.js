module.exports = function(App) {
	"use strict";
	/**
	 * @ngdoc controller
	 * @name boilerplate.controller
	 * @description
	 *
	 */
	App.controller('detailsCtrl', ['$scope', '$rootScope', '$routeParams', 'detailsSrv', 'parallaxHelper', function($scope, $rootScope, $routeParams, detailsSrv, parallaxHelper) {
        console.log("before service ");
		var data = detailsSrv.getProjectDetailsByID( $routeParams.name );

		console.log ("detailsCtrl", $routeParams.name, data, detailsSrv.getProjectDetailsByID );

		// $scope.client = data.client;
		// $scope.campaign = data.campaign;
		// $scope.description = data.description;
		// $scope.blocks = data.blocks;
		// $scope.background = parallaxHelper.createAnimator(.3);

		// TODO display correct data in the template

	}]);

	return App;
};
