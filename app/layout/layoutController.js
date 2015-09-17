	"use strict";
	
  app
	.controller('layoutController', ['$scope', function($scope) {
		$scope.lala=1;
		
	}])
	
	.directive("menu", function (){
		console.log("dfdfdflll");
		return {
		restrict: 'EA',
		templateUrl: 'app/layout/views/sidebarView.html'			
		};
	});
 