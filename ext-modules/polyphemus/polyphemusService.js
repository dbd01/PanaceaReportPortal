"use strict";

angular.module('polyphemusModule').factory('polyphemusService', ["$resource", "polyphemusSettings",
	function($resource, polyphemusSettings) {
			return $resource(polyphemusSettings.authServerPath + '/login', {}, {
				send: { method: 'POST' }
			});
		}]);