(function(){
	"use strict";
	angular.module('polyphemusModule').factory('polyphemusService', ["$resource", "polyphemusSettings", polyphemusService]);
	
	function polyphemusService($resource, polyphemusSettings) {
		return $resource(polyphemusSettings.authServerPath + '/login', {}, {
			send: { method: 'POST' }
		});
	}
})();