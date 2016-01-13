(function(){
	"use strict";

	angular.module('dbdGridViewModule').factory('dbdGridViewCommServiceIn', ['$rootScope', function($rootScope) {
		return{
			setLang : function(newValue) {
				$rootScope.lang=newValue;
			}
		}
	}]);
})();