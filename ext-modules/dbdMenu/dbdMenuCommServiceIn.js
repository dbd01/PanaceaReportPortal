"use strict";

angular.module('dbdMenuModule').factory('dbdMenuCommServiceIn', ['$rootScope', function($rootScope) {
		return{
    	getValue : function() {
	      return this.myValue;
	    },
	    setValue : function(newValue) {
	    	console.log("dbdMenuCommServiceIn : ", newValue);
	      this.myValue = newValue;
	      $rootScope.states=newValue;
	    }
    }
}]);