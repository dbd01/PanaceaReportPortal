	"use strict";
	
  app
	.controller('logoutController', ['$scope','$rootScope','localStorageService', '$http', 'appSettings',
		function($scope, $rootScope, localStorageService, $http, appSettings) {
			$rootScope.log_link.value="Login";
			$rootScope.log_name="";
			localStorageService.set('authorizationData', null);

			$http({
				method: 'GET',
				url: appSettings.casLogoutPath
			}).then(function sucessCb(response) {
					console.log('sucesfull logout->', response);
				}, function errorCb(response) {  
					console.log('logout error->', response);
				});
			$window.location.reload();
      /*$http.get(appSettings.casLogoutPath).
      success(function (response, status) {
      	console.log(status);
         console.log('sucesfull logout->', response);                       	 
      }).
      error(function (response, status) {  
      	console.log(status);                      
         console.log('logout error->', response);
      });   */
	}]);