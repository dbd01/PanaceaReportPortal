(function(){
	"use strict";

	angular.module('dbdGridViewModule').factory('dbdGridViewCommServiceIn', ['$rootScope', dbdGridViewCommServiceIn]);
	
	function dbdGridViewCommServiceIn($rootScope) {
		return{
			setLang : function(newValue) {
				$rootScope.lang=newValue;
			}
		}
	};
})();