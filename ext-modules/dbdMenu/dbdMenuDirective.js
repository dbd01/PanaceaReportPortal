(function(){
"use strict";

	angular.module("dbdMenuModule").directive("dbdMenu", function () {
	  return {
	    transclude: true,
	    scope: {
	     
	    },
	    controller: "dbdMenuController",
	    templateUrl: "ext-modules/dbdMenu/dbdMenuTemplate.html"
	  };
	});
})();