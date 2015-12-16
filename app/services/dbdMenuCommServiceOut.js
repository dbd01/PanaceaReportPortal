"use strict";

angular.module('PanaceaReports').factory('dbdMenuCommServiceOut',function(dbdMenuCommServiceIn) {
	return{
		getValue : function() {
			return dbdMenuCommServiceIn.getValue();
		},
		setValue : function(newValue) {
			dbdMenuCommServiceIn.setValue(newValue);
		}
	}
});