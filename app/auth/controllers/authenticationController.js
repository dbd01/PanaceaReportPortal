'use strict';

    app.controller('authenticationController', ['$scope', 'localStorageService', '$location', 'navigationService', '$stateParams', '$rootScope', 
    	function ($scope, localStorageService, $location, navigationService, $stateParams, $rootScope) {
	    	console.log("dddd", $stateParams);
	        console.log("GGG", $location.path());     
	                              	       		
	        //set the token  		               
	        localStorageService.set('authorizationData', 
	         	{ token: $stateParams.token,              	   
	         	  expires: $stateParams.expires		                 	   
	         	});
	        
	        $rootScope.log_link.value = "Logout";

	        //get the last desired navigation
	        var navLocation = navigationService.list[navigationService.list.length-1];
	        navigationService.flush();

	        if (navLocation==null)
	        	$location.path('/welcome');
	        else
	        	$location.path('/'+navLocation);    	 

	}]);
		
