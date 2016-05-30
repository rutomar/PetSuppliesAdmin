'use strict';

admin.controller('CategoryController', function($rootScope, $scope, $http,
		$location) {
	
	var categoryUri = $rootScope.webserviceuri + '/category/' ;
	
	$scope.category = {
		categoryCode : '',
		categoryName : ''
	};
	
	$scope.fetchAllCategories = function() {
		console.log('Getting All categories');
		$http.get(categoryUri).success(
				function(data) {
					$rootScope.categories = data;
					$scope.categories = data;
					console.log('Categories found.');
				}).error(function() {
			console.error('Error while fetching categories');
		});
	};

	$scope.addCategory = function(category) {
		console.log('adding category');
		$http.post(categoryUri,
				data.createCategoryObject(category)).success(function(data) {
			console.log('adding category');
			console.log(data);
			if (data)
				$scope.fetchAllCategories();

		}).error(function(data, status, headers, config) {
			console.log(status);
		});

	};

	var data = {
		createCategoryObject : function(category) {
			return {
				categoryCode : category.categoryCode,
				categoryName : category.categoryName
			};
		}
	};

	$scope.updateCategory = function(category, categoryCode) {

		$http.put(categoryUri , data.createCategoryObject(category)).success(function(data) {
				console.log('updating category '+categoryCode);
				if (data){
					console.log('updated category '+category);
					$scope.editCategory = false;
					$scope.fetchAllCategories();
				}
			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		
	};
	
	$scope.getCategory = function (categoryCode){
		$http.get(categoryUri+categoryCode).success(function(data) {
			console.log('getting category '+categoryCode);
			if (data){
				if (data.categoryCode === categoryCode){
					console.log('returned true');
					return true;
				}
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
			return false;
		});
	};

	$scope.deleteCategory = function(categoryCode) {
		
		console.log('deleting category : '+categoryCode);
		$http.delete(categoryUri+categoryCode).success(function(data) {
			console.log('deleting category');
			console.log(data);
			if (data)
				$scope.fetchAllCategories();

		}).error(function(data, status, headers, config) {
			console.log(status);
		});
	};

	$scope.fetchAllCategories();

	$scope.submit = function() {
		if (!$scope.editCategory) {
			console.log('Saving New Category', $scope.category.categoryCode);
			$scope.addCategory($scope.category);
		} else {
			$scope.updateCategory($scope.category, $scope.category.categoryCode);
			console.log('Category updated with category code ', $scope.category.categoryCode);
		}
		$scope.reset();
	};

	$scope.edit = function(categoryCode) {
		console.log('Category to be edited', categoryCode);
		for (var i = 0; i < $scope.categories.length; i++) {
			if ($scope.categories[i].categoryCode === categoryCode) {
				$scope.editCategory = true;
				$scope.category = angular.copy($scope.categories[i]);
				break;
			}
		}
	};

	$scope.remove = function(categoryCode) {
		console.log('categoryCode to be deleted', categoryCode);
		if ($scope.category.categoryCode === categoryCode) {
			$scope.reset();
		}
		$scope.deleteCategory(categoryCode);
	};

	$scope.reset = function() {
		$scope.category = {
			categoryCode : '',
			categoryName : ''			
		};
		$scope.categoryForm.$setPristine(); // reset Form
	};

});