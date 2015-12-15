"use strict";

angular.module('PanaceaReports').factory('polyphemusCommService',['localStorageService', '$rootScope', function(localStorageService, $rootScope) {
    return{
    	getValue : function() {
	      return this.myValue;
	    },
	    setValue : function(newValue) {
	      this.myValue = newValue;
	      localStorageService.set('authorizationData',{token: this.myValue.token, 
	      	userName: this.myValue.userName, 
	      	expires: this.myValue.expires
	      });
	      $rootScope.state="authorized";
	      $rootScope.log_name=this.myValue.userName;
	      console.log(this.myValue);
	    }
    }
}]);