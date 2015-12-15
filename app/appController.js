"use strict";

angular.module('PanaceaReports').controller('appController',
	['$scope', '$rootScope', 'localStorageService', '$location',
		function ($scope, $rootScope, localStorageService, location) {
			$scope.state = 'unauthorized';
			$rootScope.$watch('state', function (newvalue, oldvalue) {
				if (newvalue=='authorized'){
					$scope.state = 'authorized';
					$location.path('/welcome');
				}
				else{
					$scope.state = 'authorized';
					$location.path('/');
				}
			})
		}]);