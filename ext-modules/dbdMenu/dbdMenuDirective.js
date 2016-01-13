(function(){
"use strict";

	angular.module("dbdMenuModule").directive("dbdMenu", dbdMenu);
	function dbdMenu() {
	  return {
	    transclude: true,
	    scope: {
	     
	    },
	    controller: "dbdMenuController",
	    templateUrl: "ext-modules/dbdMenu/dbdMenuTemplate.html"
	  };
	};
})();