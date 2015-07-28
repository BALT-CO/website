(function () {
	"use strict";

	require('angular');
	require('angular-route');
	require('angular-scroll');
	require('angular-parallax');

	var App = angular.module('balt', ['ngRoute','duParallax']);

	require('./router')(App);

	var detailsSrv = require('./details/service')(App);
	require('./details/controller')(App);
	require('./details/directive')(App);

	require('./home/controller')(App);
	require('./home/directive')(App);

	// detailsSrv.load( 'assets/ajax/projects.json', detailsSrv.loaded );

}());


'use strict';

function injectAngular() {
	angular.element(document).ready(function() {
      var domElement = document.getElementById('flapper');
      angular.bootstrap(domElement, ['flapper']);
  });
};

(function () {
	injectAngular();
}());


angular.element(document).ready(function() {
   callService(function () {
      angular.bootstrap(document);
   });
});
