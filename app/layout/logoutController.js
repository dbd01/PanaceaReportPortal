(function(){
	"use strict";
	
  angular.module('PanaceaReports').controller('logoutController', logoutController);
  logoutController.$inject= ['$scope', '$rootScope', 'localStorageService', '$http', 'appSettings', 'dbdMenuCommServiceOut'];
	function logoutController($scope, $rootScope, localStorageService, $http, appSettings, dbdMenuCommServiceOut) {
		$rootScope.authState='unauthorized';
		$rootScope.log_name="";
		localStorageService.set('authorizationData', null);
		dbdMenuCommServiceOut.setStates([]);
		if ($rootScope.loginService=='cas'){
			$http({
				method: 'GET',
				url: appSettings.casLogoutPath
			}).then(function sucessCb(response) {
					console.log('sucesfull logout->', response);
				}, function errorCb(response) {  
					console.log('logout error->', response);
				});
		}
		
    /*$http.get(appSettings.casLogoutPath).
    success(function (response, status) {
    	console.log(status);
       console.log('sucesfull logout->', response);                       	 
    }).
    error(function (response, status) {  
    	console.log(status);                      
       console.log('logout error->', response);
    });   */
  }
})();