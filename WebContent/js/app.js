'use strict';
var admin = angular.module('admin', [ 'ngRoute', 'ngResource' ]);

admin.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {

		templateUrl : 'templates/adminlogin.html',
		controller : 'AdminLoginController'

	}).when('/home', {

		templateUrl : 'templates/home.html',
		controller : 'HomePageController'

	}).when('/category', {

		templateUrl : 'templates/category.html',
		controller : 'CategoryController'

	});

	$locationProvider.html5Mode(true);

});
