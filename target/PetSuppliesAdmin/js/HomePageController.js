'use strict';

admin
		.controller(
				'HomePageController',
				function($rootScope, $scope, $http, $location) {

					$scope.greeting = "Hello Admin!";

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
										} else
											init();
									});

					var init = function() {
						if ($scope.serviceStarted) {
							console.log('inside init');
							// get Categories
							$http
									.get($rootScope.webserviceuri + '/category')
									.success(function(data) {
										$rootScope.categories = data;
										console.log('Categories found.');
									})
									.error(
											function() {
												console
														.error('Error while fetching categories');
											});

							// get products
							$http
									.get($rootScope.webserviceuri + '/product')
									.success(function(data) {
										$rootScope.products = data;
										console.log('Products found.');
									})
									.error(
											function() {
												console
														.error('Error while fetching products');
											});
						}
					};

					$scope.logout = function() {
						$rootScope.activeUser = {};
						$location.path("/");

					};

				});