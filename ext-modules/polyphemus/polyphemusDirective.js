(function(){
"use strict";

	angular.module("polyphemusModule").directive("polyphemusLogin", polyphemusLogin); 
	function polyphemusLogin() {
	  return {
	    transclude: true,
	    scope: {
	      username:'=',
	      password:'='
	    },
	    controller: "polyphemusController",
	    templateUrl: "ext-modules/polyphemus/polyphemusTemplate.html"
	  };
	}
})();