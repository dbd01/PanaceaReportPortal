	"use strict";
	
  app.directive('menu2',['$location', function ($location){
     	
		return {
			restrict: 'EA',
			templateUrl: 'app/layout/views/sidebarView.html',	
			link: function ($scope) {
				
				console.log("dfd33f")
				//$location.path('/dashboard/login');
				

    	}			 
		};
	}]);
	
 