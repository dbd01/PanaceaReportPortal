(function(){
	"use strict";

	angular.module('PanaceaReports').controller('loggedInController', loggedInController);
	loggedInController.$inject= ['$scope', '$rootScope', '$state'];
	function loggedInController($scope, $rootScope, $state) {
		console.log("loggedInController: ", $rootScope.authState);
		$rootScope.states = $state.get();
	}
})();