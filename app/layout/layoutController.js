"use strict";

angular.module('PanaceaReports').controller('layoutController',
	['$scope', '$rootScope', 'localStorageService', '$location', 'appSettings',
		function ($scope, $rootScope, localStorageService, $location, appSettings) {
			console.log("layoutController");
			$scope.casPath = appSettings.casPath;
			$scope.state = 'unauthorized';
			$rootScope.$watch('state', function (newvalue, oldvalue) {
				console.log("layoutController: watch");
				if (newvalue=='authorized'){
					console.log("layoutController: watch: authorized")
					$scope.state = 'authorized';
					$rootScope.log_name=localStorageService.get('authorizationData').log_name;
					$location.path('/welcome');
				}
				else{
					console.log("layoutController: watch: unauthorized")
					$scope.state = 'unauthorized';
					$rootScope.log_name=null;
					$location.path('/');
				}
			})
		}]);