	"use strict";
	
  app.directive('menu2',['$location', '$state','$rootScope', function ($location, $state, $rootScope){
		return {
			restrict: 'EA',
			templateUrl: 'app/layout/views/sidebarView.html',	
			link: function ($scope) {

			console.log("sssss",$state.current.name);				
			//$rootScope.log_link.value;							
    		}			 
		};
	}]);
	
 