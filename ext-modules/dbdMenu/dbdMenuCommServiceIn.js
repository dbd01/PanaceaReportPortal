"use strict";

angular.module('dbdMenuModule').factory('dbdMenuCommServiceIn', ['$rootScope', function($rootScope) {
		return{
    	getValue : function() {
	      return this.myValue;
	    },
	    setValue : function(newValue) {
	      this.myValue = newValue;
	      $rootScope.states=newValue;
	    }
    }
}]);