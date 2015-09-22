'use strict';

    app.controller('authenticationController', ['$scope', 'authenticationService','appSettings', function ($scope, authenticationService, appSettings) {
			
			$scope.username = "";
			$scope.password = "";
			console.log ("gggg",appSettings.authServerPath);
			
			//send auth data to auth server
			$scope.authData = {
           		 username: $scope.username,
           		 password: $scope.password,
           		 applicationId: "testAuthAppServ"
        		};

        	$scope.login = function () {
            	authenticationService.send($scope.authData, function (response) {
	                console.log("authentication data been sent successfully");
	                console.log("auth data :",$scope.authData);
	                console.log("response:",response );
	                //$location.path('/portal/portals');
	            	},
            	 	function (response) {
	                	console.log($scope.authData);
		                if (response.data == null)	                
		                   console.log("response data is null!");	               
		                else
		                {
		                   var errors = [];
		                   for (var key in response.data.modelState) {
		                        for (var i = 0; i < response.data.modelState[key].length; i++) {
		                           errors.push(response.data.modelState[key][i]);
		                        }
		                    }
		                    console.log("Failed to add portal due to: " + errors.join(' '));
		                }
             		});            
        		};




		}]);
		
