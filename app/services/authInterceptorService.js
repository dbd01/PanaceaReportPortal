"use strict";

app
  .factory("authInterceptorService", ['$injector','$rootScope', '$location', 'localStorageService','consoleService', authService])

function authService($injector, $rootScope, $location, localStorageService, consoleService) {
	var state=null;
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log("authInterceptorService : fromState: ", fromState.name);
		state=toState.name;
		var authData = localStorageService.get('authorizationData');
    console.log("authInterceptorService: loc-path: ", $location.path());
    console.log("authInterceptorService :to state: ", toState.name);
    if (authData) {
      console.log("authInterceptorService: authorized");
      $rootScope.state='authorized';
      //$rootScope.log_name=authData.log_name;
    }
    else {
      if (state!="casGetCreds"){
        console.log("authInterceptorService: /")
        $location.path('/');
      }
      console.log("authInterceptorService: unauthorized");
      $rootScope.state='unauthorized';
      //$rootScope.log_name=null;
    }
    /*if ((state =="lala.login") && ($rootScope.log_link.value=="Logout")){
      console.log("authInterceptorService: welcome")
    	$location.path('/welcome');
    }*/
  });
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log("authInterceptorService: stateChangeSuccess")
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log("authInterceptorService: stateChangeError: ", error);
  });
  var quest = {};
  var _request  = function (config) {
  	var authData = localStorageService.get('authorizationData');
  	//if token has expired, clear auth data..
  	if ((authData !=null) && (Date.now() > authData.expires )){
      console.log("authInterceptorService : _request: token expired");
  		authData=null;
  		$rootScope.log_link.value="Login";
  		$location.path('/login');
  		localStorageService.set('authorizationData', null);
  		bootbox.confirm("Your allowed connection period has expired. Please login again.", function(ok) { });
  	}
  	if (authData) {
      console.log("authInterceptorService: _request: authData: ", authData);
  		config.headers = { 
  			'Content-Type': 'application/json',
  			'x-access-token': localStorageService.get('authorizationData').token
  		}
  		if (state && state.indexOf("Deleted")>-1){
  			consoleService.printIt("state: ", state);
  			config.headers["deleted"]=true;
  		}
  	}
  	return config;
  }
  console.log("authInterceptorService: quest");
  quest.request = _request;
  return quest;
}
