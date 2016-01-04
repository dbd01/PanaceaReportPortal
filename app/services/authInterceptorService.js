"use strict";

app
  .factory("authInterceptorService", ['$injector','$rootScope', '$location', 'localStorageService', 'dbdMenuCommServiceOut','$urlRouter', authService])

function authService($injector, $rootScope, $location, localStorageService, dbdMenuCommServiceOut, $urlRouter) {
	var state=null;
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //event.preventDefault();
    console.log("authInterceptorService : fromState: ", fromState.name);
    console.log("authInterceptorService :to state: ", toState.name, toParams);
		state=toState.name;
    if (state=="casGetCreds"){
      console.log("authInterceptorService: cas");
      localStorageService.set('authorizationData', { 
        token: toParams.token,
        expires: toParams.expires,
        log_name: toParams.user
      });
      $rootScope.authState='authorized';
      $rootScope.loginService='cas';
      event.preventDefault();
      $location.path('/welcome');
    }
    else{
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        console.log("authInterceptorService: authorized");
        $rootScope.authState='authorized';
      }
      else {
        console.log("authInterceptorService: unauthorized");
        $rootScope.authState='unauthorized';
        event.preventDefault();
        $location.path('/');
      }
    }
  });
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log("authInterceptorService: stateChangeSuccess");
    //$urlRouter.sync();
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
      console.log("authInterceptorService: state: ", state)
  		if (state && state.indexOf("deleted")>-1){
  			config.headers["deleted"]=true;
  		}
  	}
  	return config;
  }
  console.log("authInterceptorService: quest");
  quest.request = _request;
  return quest;
}
