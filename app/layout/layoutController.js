	"use strict";
	
  app
	.controller('layoutController', ['$scope', function($scope) {
		$scope.lala=1;
	}])
	
	.directive("sidebar-directive", function (){
		return {
		restrict: 'EA',
		templateUrl: 'app/layout/views/sidebarView.html'			
		};
	});
 