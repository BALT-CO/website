module.exports = function(App) {
	"use strict";

	App.config(function ($compileProvider){
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	});

	App.config(function($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'assets/views/home.html',
				sectionName: 'home'
			})
			.when('/:name', {
				templateUrl: 'assets/js/details/details.html',
				sectionName: 'details'
			})
			.otherwise({ redirectTo: '/' });

		//check browser support
		// $locationProvider.html5Mode(true);
	});


	App.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
		$rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
			// Get all URL parameter
			if ( $location.path() != '/'){
				$rootScope.sectionType = "page";
			} else {
				$rootScope.sectionType = "";
			}
			// $element.on( 'webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend' , function() {
			// 	console.log("id:", $element.attr('id'), "sectionType", $rootScope.sectionType );
			// 	if ( $element.attr('id') != 'details' && $rootScope.sectionType == 'page' ){
			// 		$element.addClass('hidden');
			// 	} else if ( $element.attr('id') != 'details' && $rootScope.sectionType != 'page' ){
			// 		$element.removeClass('hidden');
			// 	}
			// });
		});
	}]);

};
