'use strict';

admin.controller("AdminLoginController", 
		function($rootScope, $scope, $http, $location) {
		
		$rootScope.webserviceuri = "http://localhost:8084/core";
		$rootScope.authenticated = false;
		
		var authenticate = function(credentials, callback) {

			var headers = credentials ? {
				authorization : "Basic "
						+ btoa(credentials.username + ":"
								+ credentials.password)
			} : {};

			$http.get($rootScope.webserviceuri+'/', {
				headers : headers
			}).success(function(data) {
				//if (data.name) {
				if (data){
					$rootScope.authenticated = true;
				} else {
					$rootScope.authenticated = false;
				}
				callback && callback();
			}).error(function() {
				$rootScope.authenticated = false;
				callback && callback();
			});

		}

		authenticate();
		$scope.credentials = {};
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