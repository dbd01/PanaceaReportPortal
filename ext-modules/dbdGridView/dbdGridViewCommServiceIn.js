"use strict";

angular.module('dbdGridViewModule').factory('dbdGridViewCommServiceIn', ['$rootScope', function($rootScope) {
		return{
	    setLang : function(newValue) {
	    	console.log("dbdGridViewCommServiceIn : ", newValue);
	      $rootScope.lang=newValue;
	    }
    }
}]);