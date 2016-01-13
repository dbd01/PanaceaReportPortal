(function(){
	"use strict";

	angular.module('polyphemusModule').factory('polyphemusCommServiceOut', polyphemusCommServiceOut);
	function polyphemusCommServiceOut(polyphemusCommServiceIn) {
		return{
			getValue : function() {
				return polyphemusCommServiceIn.getValue();
			},
			setValue : function(newValue) {
				polyphemusCommServiceIn.setValue(newValue);
			}
		}
	};
})();