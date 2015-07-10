module.exports = function(App) {
	"use strict";
	
	/**
	 * @ngdoc service
	 * @name boilerplate.service
	 * @description
	 * 
	 */
	App.factory('workSrv', ['$http', function($http) {

		var _service = {
			
			projects: [],

			resourceFileLoaded: false,

			getProjectDetailsByID : function( id ) {
				return _service.projects[id];
			},

			load : function ( path, cb ) {
				$http.get( path ).
					success(cb).
					error(function(data, status, headers, config) {
						console.log ( "ERROR LOADING DATA ", status );
					});
			},

			loaded: function(data, status, headers, config) {
				for ( var mouseY = 0; mouseY < data.length; mouseY++ ){
					_service.projects[data[mouseY].slug] = data[mouseY];
				}
			}
		};

		// force the load of the stored stores
		if(!_service.resourceFileLoaded) {
			_service.load( 'assets/ajax/projects.json', _service.loaded );
		}

		return _service;

	}]);

	/**
	 * @ngdoc controller
	 * @name boilerplate.controller.workButtonCtrl
	 * @description 
	 * @param $scpoe {Object} : 
	 * @param $attrs {Object} : 
	 */
	App.controller('workButtonCtrl', ['$scope', '$attrs', '$location', '$element', 'workSrv', function($scope, $attrs, $location, $element, workSrv) {
		$scope.openWork = function ( name ) {
			$location.path( name );
		};

		$scope.out = function(e) {
			var style = "translate3d(0px,0px, 0px)";
			$element.find("picture").css({
			    "-webkit-transform": style,
			    "transform": style,
			    "moz-transform": style
			});
		};

		$scope.over = function(e) {
		};

		$scope.move = function(e) {
			var width = $element[0].offsetWidth,
			    height = $element[0].offsetHeight,
			    field = 10,
			    mouseX = .2 - e.offsetX / width,
			    mouseY = .2 - e.offsetY / height,
			    style = "translate3d(" + Math.round(mouseX * field) + "px," + Math.round(mouseY * field) + "px, 0px)";
			$element.find("picture").css({
			    "-webkit-transform": style,
			    "transform": style,
			    "moz-transform": style
			});
		};


	}]);

	return App;
};
