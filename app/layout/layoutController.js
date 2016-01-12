"use strict";

angular.module('PanaceaReports').controller('layoutController',
	['$state', '$scope', '$rootScope', 'localStorageService', 'appSettings', 'gettextCatalog', 'dbdMenuCommServiceOut', 'dbdGridViewCommServiceOut',
		function ($state, $scope, $rootScope, localStorageService, appSettings, gettextCatalog, dbdMenuCommServiceOut, dbdGridViewCommServiceOut) {
			console.log("layoutController");
			$scope.languages=['en', 'el'];
			$scope.lang='el';
			$scope.casPath = appSettings.casPath;
			$scope.state = 'unauthorized';
			$rootScope.$watch('authState', function (newvalue, oldvalue) {
				console.log("layoutController: watch");
				if (newvalue=='authorized'){
					console.log("layoutController: watch: authorized")
					$scope.state = 'authorized';
					$rootScope.log_name=localStorageService.get('authorizationData').log_name;
					$state.go('start.logged_in');
				}
				else{
					console.log("layoutController: watch: unauthorized")
					$scope.state = 'unauthorized';
					$rootScope.log_name=null;
					$state.go('start');
				}
			})
			$scope.changeLanguage=function(){
				gettextCatalog.setCurrentLanguage($scope.lang);
				dbdMenuCommServiceOut.setLang($scope.lang);
				dbdGridViewCommServiceOut.setLang($scope.lang);
			}
		}]);