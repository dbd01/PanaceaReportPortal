(function(){
	"use strict";

	angular.module('dbdMenuModule').factory('dbdMenuCommServiceIn', dbdMenuCommServiceIn);
	dbdMenuCommServiceIn.$inject= ['$rootScope'];
	
	function dbdMenuCommServiceIn($rootScope) {
		return{
			setStates : function(newValue) {
				$rootScope.states=newValue;
			},
			setLang : function(newValue) {
				console.log("dbdMenuCommServiceIn : ", newValue);
				$rootScope.lang=newValue;
			}
		}
	};
})();