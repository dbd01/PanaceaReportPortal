(function(){
"use strict";

	angular.module('PanaceaReports').controller('layoutController', layoutController);
		layoutController.$inject= ['$state', '$scope', '$rootScope', 'localStorageService', 'appSettings', 'gettextCatalog'];
		function layoutController($state, $scope, $rootScope, localStorageService, appSettings, gettextCatalog){
			console.log("layoutController");
			$scope.languages=['en', 'el'];
			$scope.lang=localStorageService.get('lang');
			if (!$scope.lang)
				$scope.lang='el';
			$scope.casPath = appSettings.casPath;
			$scope.state = 'unauthorized';
			$rootScope.$watch('authState', function (newvalue, oldvalue) {
				console.log("layoutController: watch");
				if (newvalue=='authorized'){
					console.log("layoutController: watch: authorized");
					$scope.state = 'authorized';
					$rootScope.log_name=localStorageService.get('authorizationData').log_name;
					if ($state.includes('start')&&!$state.includes('start.logged_in')){
						$state.go('start.logged_in');
					}
					else{
						$rootScope.states = $state.get();
					}
				}
				else{
					console.log("layoutController: watch: unauthorized");
					$scope.state = 'unauthorized';
					$rootScope.log_name=null;
					$state.go('start');
				}
			});
			$scope.changeLanguage=function(){
				gettextCatalog.setCurrentLanguage($scope.lang);
				$rootScope.lang = $scope.lang;
				localStorageService.set('lang', $scope.lang);
			};
		}
})();