'use strict';

    app.controller('authenticationController', ['$scope', 'localStorageService', '$location', 'navigationService', '$window', 
    	function ($scope, localStorageService, $location, navigationService, $window) {

    	var source = new EventSource('https://echidna.dotbydot.eu:4457/cas/');

		// Add event listener
		source.on('eventName', function(data) {
		  console.log("lalaaaaa", data);
		});

		// Fire a event (also very useful for testing and debugging!!)
		//source.trigger('eventName', { mykey: 'myvalue' });

		// Unbind event listener (very important for complex applications)
		//source.off('eventName'); 
			     
                               
		       		
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
		
