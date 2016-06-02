'use strict';

admin.controller('EditUserController', function($rootScope, $scope, $http,
		$location) {
	
	var EditUserUri = $rootScope.webserviceuri + '/user/' ;
	
	
	$scope.user = {
			userId : '',
			userName : '',
			password : '',
			role : '',
			address : {
				userId : '',
				address : '',
				emailId : '',
				city : ''
			}
	};
	
	$scope.fetchAllUsers = function() {
		console.log('Getting All Users');
		$http.get(EditUserUri).success(
				function(data) {
					$rootScope.users = data;
					$scope.users = data;
					console.log('Users found.');
				}).error(function() {
			console.error('Error while fetching Users');
		});
	};

	var data = {
			createUserObject : function(user) {
				return {
					userId : user.userId,
					userName : user.userName,
					password : user.password,
					role : user.role,
					address : {
						userId : user.userId,
						address : user.address.address,
						emailId : user.address.emailId,
						city : user.address.city
					}
				};
			}
		};

	$scope.updateUser = function(User, userId) {

		$http.put(EditUserUri , data.createUserObject(User)).success(function(data) {
				console.log('updating User '+userId);
				if (data){
					console.log('updated User '+User);
					$scope.fetchAllUsers();
				}
			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		
	};
	
	$scope.getUser = function (userId){
		$http.get(EditUserUri+userId).success(function(data) {
			console.log('getting User '+userId);
			if (data){
				if (data.userId === userId){
					console.log('returned true');
					return true;
				}
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
			return false;
		});
	};

	$scope.deleteUser = function(userId) {
		
		console.log('deleting User : '+userId);
		$http.delete(EditUserUri+userId).success(function(data) {
			console.log('deleting User');
			console.log(data);
			if (data)
				$scope.fetchAllUsers();

		}).error(function(data, status, headers, config) {
			console.log(status);
		});
	};

	$scope.fetchAllUsers();

	$scope.submit = function() {
		
		$scope.updateUser($scope.user, $scope.user.userId);
		console.log('User edited with UserId ', $scope.user.userId);
		$scope.reset();
	};

	$scope.edit = function(userId) {
		console.log('User to be edited ' + userId + ' uersss.lentgh' + $scope.users.length);
		for (var i = 0; i < $scope.users.length; i++) {
			if ($scope.users[i].userId === userId) {
				$scope.user = angular.copy($scope.users[i]);
				console.log('editing User ' + $scope.user);
				break;
			}
		}
	};

	$scope.remove = function(userId) {
		console.log('userId to be deleted', userId);
		if ($scope.user.userId === userId) {
			$scope.reset();
		}
		$scope.deleteUser(userId);
	};

	
	$scope.reset = function() {
	
		$scope.user = {
				userId : '',
				userName : '',
				password : '',
				role: '',
				address : {
					userId : '',
					address : '',
					emailId : '',
					city : ''
				}
		};
	
		$scope.userForm.$setPristine(); // reset Form
	};


});