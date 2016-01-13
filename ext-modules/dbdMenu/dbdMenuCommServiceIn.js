(function(){
	"use strict";

	angular.module('dbdMenuModule').factory('dbdMenuCommServiceIn', ['$rootScope', function($rootScope) {
		return{
			setStates : function(newValue) {
				$rootScope.states=newValue;
			},
			setLang : function(newValue) {
				console.log("dbdMenuCommServiceIn : ", newValue);
				$rootScope.lang=newValue;
			}
		}
	}]);
})();