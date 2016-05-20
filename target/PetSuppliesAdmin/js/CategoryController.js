'use strict';

admin.controller('CategoryController', [
		'$scope',
		function($scope) {

			var self = this;
			self.category = {
				categoryCode : null,
				categoryName : ''
			};
			
			self.categories = [];

			self.fetchAllCategories = function() {

			};

			self.addCategory = function(category) {

			};

			self.updateCategory = function(category, categoryCode) {
				
			};

			self.deleteCategory = function(categoryCode) {
				
			};

			self.fetchAllCategories();

			self.submit = function() {
				if (self.category.categoryCode === null) {
					console.log('Saving New User', self.user);
					self.createUser(self.user);
				} else {
					self.updateUser(self.user, self.user.id);
					console.log('User updated with id ', self.user.id);
				}
				self.reset();
			};

			self.edit = function(id) {
				console.log('id to be edited', id);
				for (var i = 0; i < self.users.length; i++) {
					if (self.users[i].id === id) {
						self.user = angular.copy(self.users[i]);
						break;
					}
				}
			};

			self.remove = function(id) {
				console.log('id to be deleted', id);
				if (self.user.id === id) {//clean form if the user to be deleted is shown there.
					self.reset();
				}
				self.deleteUser(id);
			};

			self.reset = function() {
				self.user = {
					id : null,
					username : '',
					address : '',
					email : ''
				};
				$scope.myForm.$setPristine(); //reset Form
			};

		} ]);