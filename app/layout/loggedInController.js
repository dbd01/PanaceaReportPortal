(function(){
	"use strict";

	angular.module('PanaceaReports').controller('loggedInController', loggedInController);
	loggedInController.$inject= ['$scope', '$rootScope', '$state', 'dbdMenuCommServiceOut'];
	function loggedInController($scope, $rootScope, $state, dbdMenuCommServiceOut) {
		console.log("loggedInController: ", $rootScope.authState);
		dbdMenuCommServiceOut.setStates($state.get());
	};
})();