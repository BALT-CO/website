(function () {
	"use strict";

	require('angular');
	require('angular-route');
	require('angular-scroll');
	require('angular-parallax');

	var App = angular.module('balt', ['ngRoute','duParallax']);

	require('./router')(App);

	require('./details/service')(App);
	require('./details/controller')(App);
	require('./details/directive')(App);

	require('./home/controller')(App);
	require('./home/directive')(App);

}());
