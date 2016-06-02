'use strict';

admin.controller("AdminLoginController", function($rootScope, $scope, $http,
		$location) {

	$rootScope.webserviceuri = "http://localhost:8084/core";

	var authenticate = function(credentials, callback) {

		$http.get(
				$rootScope.webserviceuri + '/loginUser/' + credentials.username
						+ "/" + credentials.password).success(function(data) {

			if (data) {
				if (data.role === 'ADMIN')
					$rootScope.authenticated = true;
				else
					$rootScope.authenticated = false;
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback();
		}).error(function() {
			$rootScope.authenticated = false;
			callback && callback();
		});

	}

	$scope.credentials = {
		username : '',
		password : ''
	};
	$scope.login = function() {
		authenticate($scope.credentials, function() {
			if ($rootScope.authenticated) {
				$location.path("/home");
				$scope.error = false;
			} else {
				console.log("Oops am unauthorixed");
				$location.path("/");
				$scope.error = true;
			}
		});
	};
});