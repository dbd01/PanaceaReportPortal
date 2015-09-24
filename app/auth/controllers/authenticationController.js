'use strict';

    app.controller('authenticationController', ['$scope', '$route', 'authenticationService','appSettings','localStorageService','$location','$rootScope', 
    	function ($scope, $route, authenticationService, appSettings, localStorageService, $location, $rootScope) {	  
			
           $scope.authData = {
           		 	username: $scope.username,
           			password: $scope.password,
           			applicationId: "testAuthAppServ"
        	};       		

        	$scope.closeAlert = function() {
        		$scope.authData.username="";
        		$scope.authData.password = "";
        		$scope.alert=null;
        		$location.path('/login');
			}       
						    
        	$scope.login = function () {      		
				
        		authenticationService.send($scope.authData, 
            		function (response) {
		                console.log("authentication data been sent successfully");    
		                //console.log(response);  		               
		                localStorageService.set('authorizationData', 
		                 	{ token: response.token, 
		                 	  userName: $scope.authData.userName, 
		                 	  expires: response.expires		                 	   
		                 	});
                        
                        $rootScope.log_link.value = "Logout";
		                $location.path('/welcome');
		                
	            	},
            	 	function (response) {
	                	console.log("data..>",$scope.authData);
		                if (response.data == null)	{                
		                   console.log("response data is null!");
		                   $scope.message = "Server error";
		                }               
		                else{
		                  console.log("response error: ", response);
		                  $scope.alert = { 
				        		type: 'danger', 
				        		msg: 'Wrong Username or password' 
				           };

		                }                  
		                
             		});            
        		};


  

		}]);
		
