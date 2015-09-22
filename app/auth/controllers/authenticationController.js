'use strict';

    app.controller('authenticationController', ['$scope', 'authenticationService','appSettings', function ($scope, authenticationService, appSettings) {
			
									
			//send auth data to auth server
			$scope.authData = {
           		 username: $scope.username,
           		 password: $scope.password,
           		 applicationId: "testAuthAppServ"
        		};

        	$scope.login = function () {
        		authenticationService.send($scope.authData, 
            		function (response) {
		                console.log("authentication data been sent successfully");    
		                console.log(response.token);          
		                //$location.path('/portal/portals');
	            	},
            	 	function (response) {
	                	console.log("data..>",$scope.authData);
		                if (response.data == null)	{                
		                   console.log("response data is null!");
		                   $scope.message = "Server error";
		                }               
		                else{
		                  console.log("response error: ", response);
		               	  $scope.message = "Authorization error...";
		                }                  
		                
             		});            
        		};




		}]);
		
