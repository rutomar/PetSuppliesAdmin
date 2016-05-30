'use strict';

admin.controller('ProductController', function($rootScope, $scope, $http,
		$location) {
	
	var ProductUri = $rootScope.webserviceuri + '/product/' ;
	
	$scope.categories = $rootScope.categories;
		
	$scope.product = {
		productCode : '',
		productName : '',
		productDesc : '',
		productPrice : 0,
		categoryCode : ''
	};
	
	$scope.fetchAllProducts = function() {
		console.log('Getting All products');
		$http.get(ProductUri).success(
				function(data) {
					$rootScope.products = data;
					$scope.products = data;
					console.log('Products found.');
				}).error(function() {
			console.error('Error while fetching products');
		});
	};

	$scope.addProduct = function(product) {
		console.log('adding product');
							
		 $http.post(ProductUri,
		 data.createProductObject(product)).success(function(data) {
		 console.log('adding product'); console.log(data); if (data)
		 $scope.fetchAllProducts();
		 
		 }).error(function(data, status, headers, config) {
		 console.log(status); });
		 

	};

	var data = {
		createProductObject : function(product) {
			return {
				productCode : product.productCode,
				productName : product.productName,
				productDesc : product.productDesc,
				productPrice : product.productPrice,
				categoryCode : product.categoryCode,
			
			};
		}
	};

	$scope.updateProduct = function(product, productCode) {

		$http.put(ProductUri , data.createProductObject(product)).success(function(data) {
				console.log('updating product '+productCode);
				if (data){
					console.log('updated product '+product);
					$scope.editProduct = false;
					$scope.fetchAllProducts();
				}
			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		
	};
	
	$scope.getProduct = function (productCode){
		$http.get(ProductUri+productCode).success(function(data) {
			console.log('getting product '+productCode);
			if (data){
				if (data.productCode === productCode){
					console.log('returned true');
					return true;
				}
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
			return false;
		});
	};

	$scope.deleteProduct = function(productCode) {
		
		console.log('deleting product : '+productCode);
		$http.delete(ProductUri+productCode).success(function(data) {
			console.log('deleting product');
			console.log(data);
			if (data)
				$scope.fetchAllProducts();

		}).error(function(data, status, headers, config) {
			console.log(status);
		});
	};

	$scope.fetchAllProducts();

	$scope.submit = function() {
		if (!$scope.editProduct) {
			console.log('Saving New Product', $scope.product.productCode);
			console.log('Saving New Product', $scope.product);
			$scope.addProduct($scope.product);
		} else {
			$scope.updateProduct($scope.product, $scope.product.productCode);
			console.log('Product updated with product code ', $scope.product.productCode);
		}
		$scope.reset();
	};

	$scope.edit = function(productCode) {
		console.log('Product to be edited', productCode);
		for (var i = 0; i < $scope.products.length; i++) {
			if ($scope.products[i].productCode === productCode) {
				$scope.editProduct = true;
				$scope.product = angular.copy($scope.products[i]);
				break;
			}
		}
	};

	$scope.remove = function(productCode) {
		console.log('productCode to be deleted', productCode);
		if ($scope.product.productCode === productCode) {
			$scope.reset();
		}
		$scope.deleteProduct(productCode);
	};

	$scope.upload = function(productCode) {
		console.log('image to be uploaded for ', productCode);
	
		$scope.uploadImage = true;
		
		// $scope.deleteProduct(productCode);
	};
	
	$scope.reset = function() {
		$scope.product = {
				productCode : '',
				productName : '',
				productDesc : '',
				productPrice : 0,
				categoryCode : '',
				productImage : ''
		};
		$scope.productForm.$setPristine(); // reset Form
	};

	
	$scope.verifyIfNAN = function(){
		return true;
	}
});