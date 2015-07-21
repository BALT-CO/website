//third party libraries alias configurations for browserify

var vendorPath = "./app/assets/js/vendor/",
    appPath = "./app/assets/js";

module.exports = [
    vendorPath + 'legacy.js:legacy',
    vendorPath + 'angular.js:angular',
    vendorPath + 'angular-route.js:angular-route',
    vendorPath + 'jquery.js:jquery',
    vendorPath + 'angular-scroll.js:angular-scroll',
    vendorPath + 'angular-parallax.js:angular-parallax'
];
