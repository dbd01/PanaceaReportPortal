"use strict";

app
  .factory("authInterceptorService", ['$injector','$rootScope', '$location', 'localStorageService','consoleService', authService])

function authService($injector, $rootScope, $location, localStorageService, consoleService) {
	var state=null;
	$rootScope.$on('$stateChangeStart', function (event, toState) {
		state=toState.name;
		var authData = localStorageService.get('authorizationData');
    consoleService.printIt ("loc-path", $location.path());
    consoleService.printIt ("to state", toState.name);
    if (authData) $rootScope.log_name=authData.log_name;
    else $rootScope.log_name=null;
    if ((toState.name =="lala.login") && ($rootScope.log_link.value=="Logout"))
    	$location.path('/welcome');
    if((authData==null) &&   (($location.path()!="/login") || ($location.path()!="/") ) )
    	$location.path('/');
  });
  var quest = {};
  var _request  = function (config) {
  	var authData = localStorageService.get('authorizationData');
  	//if token has expired, clear auth data..
  	if ((authData !=null) && (Date.now() > authData.expires )){
  		authData=null;
  		$rootScope.log_link.value="Login";
  		$location.path('/login');
  		localStorageService.set('authorizationData', null);
  		bootbox.confirm("Your allowed connection period has expired. Please login again.", function(ok) { });
  	}
  	if (authData) {
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
  quest.request = _request;
  return quest;
}
