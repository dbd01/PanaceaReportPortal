'use strict';

    app.controller('authenticationController', ['$scope', 'appSettings', function ($scope, appSettings) {
			
			$scope.username = "";
			$scope.password = "";
			console.log ("gggg",appSettings.authServerPath);

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
		
