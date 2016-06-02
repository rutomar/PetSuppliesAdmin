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

	}).when('/product', {

		templateUrl : 'templates/products.html',
		controller : 'ProductController'

	}).when('/user', {

		templateUrl : 'templates/users.html',
		controller : 'EditUserController'

	}).when('/userOrder', {

		templateUrl : 'templates/orders.html',
		controller : 'OrdersController'

	}).when('/logout', {
		templateUrl : 'templates/logout.html',
		controller : 'LogoutController'
	});

	$locationProvider.html5Mode(true);

});

admin.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A', // restricting to be an attribute
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ]);
