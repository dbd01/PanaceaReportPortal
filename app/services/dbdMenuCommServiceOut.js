(function(){
"use strict";

	angular.module('PanaceaReports').factory('dbdMenuCommServiceOut', dbdMenuCommServiceOut);

	function dbdMenuCommServiceOut(dbdMenuCommServiceIn) {
		return{
			setStates: function(newValue) {
				dbdMenuCommServiceIn.setStates(newValue);
			},
			setLang : function(newValue) {
				dbdMenuCommServiceIn.setLang(newValue);
			}
		};
	}
})();