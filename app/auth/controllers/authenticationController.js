'use strict';

    app.controller('authenticationController', ['$scope',  function ($scope) {
			
			$scope.username = "";
			$scope.password = "";
								
			$scope.getAuthData = function (){
				console.log("username=", $scope.username);
				console.log("password=", $scope.password);	

			};

			//send auth data to auth server
			$scope.authData = {
           		 username: $scope.username,
           		 password: $scope.password,
           		 applicationId: "testAuthAppServ"
        		};


		}]);
		
