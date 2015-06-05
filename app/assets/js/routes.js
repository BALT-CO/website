module.exports = function(App) {
	"use strict";

	var detailsCtrl = require('./details')(App);

	App.config(function($routeProvider, $locationProvider) {
		
		$routeProvider
			.when('/:name', {
				templateUrl: 'assets/views/details.html',
				active: true,
				activeSection: 'details',
				controller: 'detailsCtrl'
			});

		//check browser support
		$locationProvider.html5Mode(true);
	});
};
