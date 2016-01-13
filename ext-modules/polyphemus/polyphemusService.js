(function(){
	"use strict";
	angular.module('polyphemusModule').factory('polyphemusService', polyphemusService);
	polyphemusService.$inject= ["$resource", "polyphemusSettings"];
	
	function polyphemusService($resource, polyphemusSettings) {
		return $resource(polyphemusSettings.authServerPath + '/login', {}, {
			send: { method: 'POST' }
		});
	}
})();