(function(){
"use strict";

	angular.module('PanaceaReports').factory('dbdGridViewCommServiceOut', dbdGridViewCommServiceOut);
	function dbdGridViewCommServiceOut(dbdGridViewCommServiceIn) {
		return{
			setLang : function(newValue) {
				dbdGridViewCommServiceIn.setLang(newValue);
			}
		}
	};
})();