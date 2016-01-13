(function(){
"use strict";

	angular.module('PanaceaReports').factory('polyphemusCommServiceIn',['localStorageService', '$rootScope', function(localStorageService, $rootScope) {
	    return{
	    	getValue : function() {
		      return this.myValue;
		    },
		    setValue : function(newValue) {
		    	console.log("polyphemusCommServiceIn");
		      this.myValue = newValue;
		      localStorageService.set('authorizationData', { 
		      	token: this.myValue.token, 
		      	expires: this.myValue.expires,
		      	log_name: this.myValue.userName
		      });
		      $rootScope.authState="authorized";
		      $rootScope.loginService='polyphemus';
		    }
	    }
	}]);
})();