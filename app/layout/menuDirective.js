	"use strict";
	
  app.directive('menu2', ['$location', 'navigationService','$rootScope', function ($location, navigationService, $rootScope){
		return {
			restrict: 'EA',
			templateUrl: 'app/layout/views/sidebarView.html',	
			link: function ($scope) {
				console.log("sssss",$rootScope.log_link.value);				
				
				$scope.reports = function(){
					navigationService.add("reports");
				}	

				$scope.users = function(){
					navigationService.add("users");
				}	

    		}			 
		};
	}]);
	
 