'use strict';

app.controller('authenticationController', ['localStorageService', '$stateParams', '$rootScope', 
	function (localStorageService, $stateParams, $rootScope) {
		//$rootScope.urlLink = {value:"true"};
    console.log("authenticationController")
		//set the token.
		localStorageService.set('authorizationData', { 
			token: $stateParams.token,
			expires: $stateParams.expires,
			log_name: $stateParams.user
		});
    $rootScope.authState='authorized';
    $rootScope.loginService='cas';
	}]);