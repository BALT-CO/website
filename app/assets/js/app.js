(function () {
    "use strict";

    require('./vendor/angular');

    var App = angular.module('boilerplate', []);
    require('./details')(App);

}());
