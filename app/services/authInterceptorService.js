"use strict";

app
   .factory("authInterceptorService", ['$injector','$rootScope', '$location', 'localStorageService', authService])

function authService($injector, $rootScope, $location, localStorageService) {
  
	$rootScope.$on('$stateChangeStart', function (event, toState) { 

       var authData = localStorageService.get('authorizationData');
       console.log ("loc-path", $location.path());
       console.log ("to state", toState.name);
       if ((toState.name =="lala.login") && ($rootScope.log_link.value=="Logout"))
       	$location.path('/welcome');

       if((authData==null) &&   (($location.path()!="/login") || ($location.path()!="/") ) )
       	  	$location.path('/');    	 	
                    	                   
    });

     var quest = {};
	
		 var _request  = function (config) { 
		 				 		     
	            var authData = localStorageService.get('authorizationData');            
	            if (authData) {
	                config.headers = { 
	                       				 'Content-Type': 'application/json',
	                       				 'x-access-token': localStorageService.get('authorizationData').token 
	                        		 }
	            }
	            
	            return config;
	        }
		
	quest.request = _request;
    
    return quest;

}
