	"use strict";
	
  app.directive('menu2',['$location', '$state', function ($location, $state){
		return {
			restrict: 'EA',
			templateUrl: 'app/layout/views/sidebarView.html',	
			link: function ($scope) {

			console.log("sssss",$state.current.name);				
			$scope.log_link = "Login";							
    		}			 
		};
	}]);
	
 