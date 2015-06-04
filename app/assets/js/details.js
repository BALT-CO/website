module.exports = function(App) {
	"use strict";

	/**
	 * @ngdoc service
	 * @name boilerplate.service
	 * @description
	 * 
	 */
	App.factory('detailsSrv', ['$http', function($http) {

		var _service = {};

		console.log ( "service" );

		return _service;

	}]);

	/**
	 * @ngdoc directive
	 * @name boilerplate.directive
	 * @description
	 * 
	 */
	App.directive('details', [function() {
		return {
			restrict: "C",
			replace: false,
			template: "",
			controller: "detailsCtrl",
			link: function($scope, elem, attrs) {
				console.log ( "directive" );
				$scope.choice = "hi";
			}
		}
	}]);
	
	/**
	 * @ngdoc controller
	 * @name boilerplate.controller
	 * @description
	 * 
	 */
	App.controller('detailsCtrl', ['$scope', '$rootScope', 'detailsSrv', function($scope, $rootScope, detailsSrv) {

		$scope.submit = function() {
			console.log ( "submit!" );
		};

		$scope.click = function($event) {
			console.log ( "click!", $event );
		}

		$scope.keyUp = function($event) {
			console.log ( "keyPress!", $event.keyCode, $scope.fieldValue );
		};

	}]);

	return App;
};
