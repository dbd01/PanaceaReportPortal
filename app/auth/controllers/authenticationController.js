'use strict';

    app.controller('authenticationController', ['$scope',  function ($scope) {
			
			$scope.username = "";
			$scope.password = "";
								
			$scope.getAuthData = function (){
				console.log("username=", $scope.username);
				console.log("password=", $scope.password);	

			};

		}]);
		
