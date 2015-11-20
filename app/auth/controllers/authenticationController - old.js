'use strict';

    app.controller('authenticationController', ['$scope', '$route', 'authenticationService','appSettings','localStorageService', 'consoleService' ,'$location','$rootScope','navigationService', 
    	function ($scope, $route, authenticationService, appSettings, localStorageService, consoleService, $location, $rootScope, navigationService) {	  
			
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
		                consoleService.printIt("authentication data been sent successfully");    
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

                        consoleService.printIt("navLocation=..", navLocation);
                        if (navLocation==null)
		                	$location.path('/welcome');
		                else
		                	$location.path('/'+navLocation);
		                
	            	},
	            	//error
            	 	function (response) {
	                	consoleService.printIt("data..>",$scope.authData);
		                if (response.data == null)	{                
		                   consoleService.printIt("response data is null!");
		                   $scope.message = "Server error";
		                }               
		                else{
		                  consoleService.printIt("response error: ", response);
		                  $scope.alert = { 
				        		type: 'danger', 
				        		msg: 'Wrong Username or password' 
				           };

		                }                  
		                
             		});            
        		};  

		}]);
		
