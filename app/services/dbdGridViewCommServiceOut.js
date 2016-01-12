"use strict";

angular.module('PanaceaReports').factory('dbdGridViewCommServiceOut',function(dbdGridViewCommServiceIn) {
	return{
		setLang : function(newValue) {
			dbdGridViewCommServiceIn.setLang(newValue);
		}
	}
});