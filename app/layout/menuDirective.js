	"use strict";
	
  app.directive('menu2',['$location', '$state', function ($location, $state){
		return {
			restrict: 'EA',
			templateUrl: 'app/layout/views/sidebarView.html',	
			link: function ($scope) {
				
				$state.current.name="koko";
				console.log("dfd33f", $state)
				//$location.path('/dashboard/login');
				

    	}			 
		};
	}]);
	
 