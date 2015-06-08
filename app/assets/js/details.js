module.exports = function(App) {
	"use strict";

	console.log ( "details" );

	// /**
	//  * @ngdoc service
	//  * @name boilerplate.service
	//  * @description
	//  * 
	//  */
	// App.factory('detailsSrv', ['$http', function($http) {

	// 	var _service = {};

	// 	console.log ( "service" );

	// 	return _service;

	// }]);
	
	/**
	 * @ngdoc controller
	 * @name boilerplate.controller
	 * @description
	 * 
	 */
	App.controller('detailsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

		console.log ("detailsCtrl");

	}]);

	return App;
};
