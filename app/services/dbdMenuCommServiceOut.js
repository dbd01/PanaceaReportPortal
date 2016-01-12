"use strict";

angular.module('PanaceaReports').factory('dbdMenuCommServiceOut',function(dbdMenuCommServiceIn) {
	return{
		setStates: function(newValue) {
			dbdMenuCommServiceIn.setStates(newValue);
		},
		setLang : function(newValue) {
			dbdMenuCommServiceIn.setLang(newValue);
		}
	}
});