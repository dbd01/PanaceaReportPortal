(function(){
"use strict";

	angular.module('PanaceaReports').factory("scopeComService", scopeComService);
	function scopeComService() {
		var messages = {};
		messages.list = [];
		messages.add = function (message) {
			messages.list.push(message);
		};
		messages.flush = function (message) {
			messages.list = [];
		};
		return messages;
	}
})();