module.exports = function(App) {
	"use strict";

	/**
	 * @ngdoc service
	 * @name boilerplate.service
	 * @description
	 *
	 */
	App.factory('detailsSrv', ['$http', function($http) {

		var _service = {

			projects: [],

			resourceFileLoaded: false,

			getProjectDetailsByID : function( id ) {
				if ( !_service.projects[id] ) {
					// _service.load( 'assets/ajax/projects.json', _service.getProjectDetailsByID(id) );
					// return this.getProjectDetailsByID( id )
				} else {
					return _service.projects[id];
				}
			},

			load : function ( path, cb ) {
			console.log("load!");
				$http.get( path ).
					success(cb).
					error(function(data, status, headers, config) {
						console.log ( "ERROR LOADING DATA ", status );
					});
			},

			loaded: function(data, status, headers, config) {
				for ( var i = 0; i < data.length; i++ ){
					_service.projects[data[i].slug] = data[i];
				}
				console.log("loaded!", _service.projects);
			}
		};

		// force the load of the stored stores
		if(!_service.resourceFileLoaded) {
			console.log("LOAD!");
            _service.resourceFileLoaded = true;
			_service.load( 'assets/ajax/projects.json', _service.loaded );
		}

		return _service;

	}]);

	return App;
};
