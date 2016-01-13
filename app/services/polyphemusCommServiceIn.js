(function(){
"use strict";

	angular.module('PanaceaReports').factory('polyphemusCommServiceIn', polyphemusCommServiceIn);
	polyphemusCommServiceIn.$inject= ['localStorageService', '$rootScope'];
	
	function polyphemusCommServiceIn(localStorageService, $rootScope) {
		return{
			getValue : function() {
				return this.myValue;
			},
			setValue : function(newValue) {
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
	};
})();