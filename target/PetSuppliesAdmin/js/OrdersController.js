'use strict';

admin.controller('OrdersController', function($rootScope, $scope, $http,
		$location) {
	
	var orderUri = $rootScope.webserviceuri + '/order/' ;
	
	$scope.order = {
			orderId : '',
			userId : '',
			totalPrice : '' ,
			productPrice :'',
			productCode : '',
			quantity : ''
	};
	
	
	$scope.fetchAllOrders = function() {
		console.log('Getting All orders');
		$http.get(orderUri).success(
				function(data) {
					$rootScope.orders = data;
					$scope.orders = data;
					console.log('Orders found.');
				}).error(function() {
			console.error('Error while fetching orders');
		});
	};

	
	$scope.updateOrder = function(orderId, status) {

		$http.put(orderUri + orderId + '/'+ status).success(function(data) {
				console.log('updating order '+orderId);
				if (data){
					console.log('updated order '+orderId);
					$scope.fetchAllOrders();
				}
			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		
	};
	
	$scope.getOrder = function (orderId){
		$http.get(orderUri+orderId).success(function(data) {
			console.log('getting order '+orderId);
			if (data){
				if (data.orderId === orderId){
					console.log('returned true');
					return true;
				}
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
			return false;
		});
	};

	$scope.deleteOrder = function(orderId) {
		
		console.log('deleting order : '+orderId);
		$http.delete(orderUri+orderId).success(function(data) {
			console.log('deleting order');
			console.log(data);
			if (data)
				$scope.fetchAllOrders();

		}).error(function(data, status, headers, config) {
			console.log(status);
		});
	};

	$scope.fetchAllOrders();

	$scope.submit = function() {
		
			$scope.updateOrder($scope.order.orderId, $scope.order.status);
			console.log('Order updated with status ', $scope.order.status);
			$scope.reset();
	};

	$scope.edit = function(orderId) {
		console.log('Order to be edited', orderId);
		for (var i = 0; i < $scope.orders.length; i++) {
			if ($scope.orders[i].orderId === orderId) {
				$scope.order = angular.copy($scope.orders[i]);
				break;
			}
		}
	};

	$scope.remove = function(orderId) {
		console.log('orderId to be deleted', orderId);
		if ($scope.order.orderId === orderId) {
			$scope.reset();
		}
		$scope.deleteOrder(orderId);
	};

	$scope.reset = function() {
		$scope.order = {
				orderId : '',
				userId : '',
				totalPrice : '' ,
				productPrice :'',
				productCode : '',
				quantity : ''
		};
		$scope.orderForm.$setPristine(); // reset Form
	};
	
	
	 $scope.statusData = {
			    availableOptions: [
			     'CANCELLED', 'SHIPPED' , 'DELIVERED' ],
			    selectedOption: $scope.order.status
			    };

});