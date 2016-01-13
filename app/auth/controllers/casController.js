(function(){
	'use strict';

	angular.module('PanaceaReports').controller('casController', ['localStorageService', '$stateParams', 
		'$rootScope', '$state', casController]);
	function casController(localStorageService, $stateParams, $rootScope, $state) {
		//$rootScope.urlLink = {value:"true"};
    console.log("casController")
		//set the token.
		localStorageService.set('authorizationData', { 
			token: $stateParams.token,
			expires: $stateParams.expires,
			log_name: $stateParams.user
		});
    $rootScope.authState='authorized';
    $rootScope.loginService='cas';
    $state.go('start.logged_in');
	};
})();