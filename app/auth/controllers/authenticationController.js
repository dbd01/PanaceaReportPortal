'use strict';

    app.controller('authenticationController', ['$scope', 'localStorageService', '$location', 'navigationService', '$stateParams', '$rootScope','$http','appSettings', 
    	function ($scope, localStorageService, $location, navigationService, $stateParams, $rootScope, $http, appSettings) {
	    	$rootScope.urlLink = {value:"true"};
	    	
	    	console.log("dddd", $stateParams);	        
	         
	        //set the token. 		               
	        localStorageService.set('authorizationData', 
	         	{ token: $stateParams.token,              	   
	         	  expires: $stateParams.expires		                 	   
	         	});

            //make a test call to see if the token provided in the url is correct
             $http.get(appSettings.authServerPath + '/api/v1/user/').
                    success(function (response, status) {
                       console.log('sucessss->', response);
                       $rootScope.log_link.value = "Logout";

				        //get the last desired navigation
				        var navLocation = navigationService.list[navigationService.list.length-1];
				        navigationService.flush();            

				        if (navLocation==null)
				        	$location.path('/welcome');
				        else
				        	$location.path('/'+navLocation);    	 

                    }).
                    error(function (response, status) {                        
                        console.log('errorrrr44->', response);
                        //reset everything
                        $rootScope.log_link.value="Login";		
		                localStorageService.set('authorizationData', null);
                    });           
	}]);
		
