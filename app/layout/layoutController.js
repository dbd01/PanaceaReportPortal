"use strict";

angular.module('PanaceaReports').controller('layoutController',
	['$scope', '$rootScope', 'localStorageService', '$location',
		function ($scope, $rootScope, localStorageService, $location) {
			console.log("layoutController");
			$scope.state = 'unauthorized';
			$rootScope.$watch('state', function (newvalue, oldvalue) {
				console.log("layoutController: watch");
				if (newvalue=='authorized'){
					$scope.state = 'authorized';
					$rootScope.log_name=localStorageService.get('authorizationData').log_name;
					$location.path('/welcome');
				}
				else{
					$scope.state = 'unauthorized';
					$rootScope.log_name=null;
					$location.path('/');
				}
			})
		}]);