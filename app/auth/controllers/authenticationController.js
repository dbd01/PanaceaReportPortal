'use strict';

    app.controller('authenticationController', ['$scope', 'localStorageService', '$location', 'navigationService', '$window', 
    	function ($scope, localStorageService, $location, navigationService, $window) {

    	console.log("dddd", $stateParams);

		 
			     
                               
		       		
/*
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
*/
	}]);
		
