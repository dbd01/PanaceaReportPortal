'use strict';

    app.controller('authenticationController', ['$scope', '$route', 'authenticationService','appSettings','localStorageService','$location','$rootScope','navigationService', 
    	function ($scope, $route, authenticationService, appSettings, localStorageService, $location, $rootScope, navigationService) {	  
			
           $scope.authData = {
           		 	username: $scope.username,
           			password: $scope.password,
           			application: "polyphemus"
        	};       		

        	$scope.closeAlert = function() {
        		$scope.authData.username="";
        		$scope.authData.password = "";
        		$scope.alert=null;
        		$location.path('/login');
			}       
						    
        	$scope.login = function () {      		
				
        		authenticationService.send($scope.authData, 
        			//success
            		function (response) {
		                console.log("authentication data been sent successfully");    
		                //set the token  		               
		                localStorageService.set('authorizationData', 
		                 	{ token: response.token, 
		                 	  userName: $scope.authData.userName, 
		                 	  expires: response.expires		                 	   
		                 	});
                        
                        $rootScope.log_link.value = "Logout";

                        //get the last desired navigation
                        var navLocation = navigationService.list[navigationService.list.length-1];
                        navigationService.flush();

                        console.log("navLocation=..", navLocation);
                        if (navLocation==null)
		                	$location.path('/welcome');
		                else
		                	$location.path('/'+navLocation);
		                
	            	},
	            	//error
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
		
