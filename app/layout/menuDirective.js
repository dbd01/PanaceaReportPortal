"use strict";

app.directive('menu2', ['$location', 'navigationService', 'consoleService','$rootScope', 'appSettings', function ($location, navigationService, consoleService, $rootScope, appSettings){
	return {
		restrict: 'EA',
		templateUrl: 'app/layout/views/sidebarView.html',	
		link: function ($scope) {
			console.log("menuDirective: log_name",$rootScope.log_name);
			$scope.casPath = appSettings.casPath;

			$scope.reports = function(){
				navigationService.add("reports");
			}

			$scope.users = function(){
				navigationService.add("users");
			}

			$scope.groups = function(){
				navigationService.add("groups");
			}

			$scope.applications = function(){
				navigationService.add("applications");
			}

			$scope.permissions = function(){
				navigationService.add("permissions");
			}

			$scope.requestedPermissions = function(){
				navigationService.add("requestedPermissions");
			}
		}
	};
}]);
	
 