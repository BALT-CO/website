module.exports = function(App) {
	"use strict";

	App.config(function($routeProvider, $locationProvider) {
		
		$routeProvider
			.when('/:name', {
				templateUrl: 'assets/views/details.html',
				controller: 'detailsCtrl'
			})
			.otherwise({ redirectTo: '/' });

		//check browser support
		// $locationProvider.html5Mode(true);
	});


	App.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
		$rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
			
			console.log('Current route name: ' + $location.path());
			
			// Get all URL parameter
			if ( $location.path() != '/'){
				$rootScope.sectionType = "page";
			} else {
				$rootScope.sectionType = "";
			}
			console.log($routeParams, $rootScope.sectionType);
		});
	}]);

};
