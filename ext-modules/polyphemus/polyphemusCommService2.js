"use strict";

angular.module('polyphemusModule').factory('polyphemusCommService2', function(polyphemusCommService) {
		return{
			getValue : function() {
				return polyphemusCommService.getValue();
			},
			setValue : function(newValue) {
				polyphemusCommService.setValue(newValue);
			}
		}
});