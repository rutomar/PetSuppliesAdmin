'use strict';

admin.controller('LogoutController', function($rootScope, $scope, $location,
		$window) {

	var destroyRootScope = function() {
		console.log('Logging out Admin');
		$rootScope.authenticated = false;
		$rootScope.categories = null;
		$rootScope.products = null;
		$rootScope.users = null;
		$rootScope.orders = null;

		$window.alert('User logged out successfully!');
		$location.path('/');
	};

	destroyRootScope();
});