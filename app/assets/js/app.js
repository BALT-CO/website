(function () {
	"use strict";

	require('angular');
	require('angular-route');

	var App = angular.module('balt', ['ngRoute']);
    require('./details')(App);
	require('./routes')(App);
	require('./work')(App);

}());