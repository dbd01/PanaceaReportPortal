	"use strict";

	app.directive("sidebar-directive", [sidebar-directive], function (){
		return {
		restrict: 'EA',
		templateUrl: 'app/layout/views/sidebarView.html'			
		};
	});
 