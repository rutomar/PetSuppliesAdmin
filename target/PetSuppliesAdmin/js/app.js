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

/*
 * myApp.service('fileUpload', [ '$http', function($http) { this.uploadFileToUrl =
 * function(file, uploadUrl) { var fd = new FormData(); fd.append('file', file);
 * $http.post(uploadUrl, fd, { transformRequest : angular.identity, headers : {
 * 'Content-Type' : undefined } }).success(function() { }).error(function() {
 * }); } } ]);
 * 
 * myApp.controller('myCtrl', [ '$scope', 'fileUpload', function($scope,
 * fileUpload) {
 * 
 * $scope.uploadFile = function() { var file = $scope.myFile; console.log('file
 * is '); console.dir(file); var uploadUrl = "/fileUpload";
 * fileUpload.uploadFileToUrl(file, uploadUrl); }; } ]);
 */