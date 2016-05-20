'use strict';

admin
		.controller(
				'HomePageController',
				function HomePageController($rootScope, $scope, $http,
						$location) {

					$scope.greeting = "Hello " + $scope.credentials.username + " !";
					$rootScope.webserviceuri = "http://localhost:8084/core";
					$rootScope.homePage = $location.absUrl();
					console.log("Pintnig webserviceuri"
							+ $rootScope.webserviceuri);
					console.log("$rootScope.homePage" + $rootScope.homePage);

					$scope.serviceStarted = false;

					$http
							.get($rootScope.webserviceuri)
							.success(
									function(data) {
										console.log(data);
										$scope.serviceStarted = data;

										console.log("Pintnig serviceStarted"
												+ $scope.serviceStarted);

										if (!$scope.serviceStarted) {
											$rootScope.message = "Service is temporarily unavialble. Please try again later."
											console.log("Pintnig message"
													+ message);
										}
									});

					$scope.init = function() {
						if ($scope.serviceStarted) {
							$http.get(webserviceuri + "/getProducts").success(
									function(data) {
										$scope.products = data.ProductsList;

									});
							$http
									.get(webserviceuri + "/getCategories")
									.success(
											function(data) {
												$scope.productsByCategories = data.branch;

											});

						}
					};
					
					$scope.logout = function() {
						$rootScope.activeUser = {};
						$location.path("/");

					};

				});