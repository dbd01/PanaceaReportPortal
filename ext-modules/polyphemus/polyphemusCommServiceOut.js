"use strict";

angular.module('polyphemusModule').factory('polyphemusCommServiceOut', function(polyphemusCommServiceIn) {
		return{
			getValue : function() {
				return polyphemusCommServiceIn.getValue();
			},
			setValue : function(newValue) {
				polyphemusCommServiceIn.setValue(newValue);
			}
		}
});