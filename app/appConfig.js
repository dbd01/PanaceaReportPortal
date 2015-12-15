"use strict";

app
    .config(['$httpProvider',function ($httpProvider) {
      console.log("app.config");
        $httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
      console.log("app.config: localStorageServiceProvider");
    localStorageServiceProvider.setPrefix('ls');
     }])

    .run(['$rootScope','$location', 'localStorageService', function($rootScope, $location, localStorageService){
      console.log("app.config : run");
        /*if  ( (localStorageService.get('authorizationData')==null)  ) {
            $rootScope.log_link = {value:"Login"};
           // $location.path( "/" );             
        }
        else*/
            $rootScope.log_link = {value:"Logout"};
     }]);