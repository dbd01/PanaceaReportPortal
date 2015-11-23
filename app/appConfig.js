"use strict";

app
    .config(['$httpProvider',function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
     }])

    .run(['$rootScope','$location', 'localStorageService', function($rootScope, $location, localStorageService){
        if  ( (localStorageService.get('authorizationData')==null) && ($location.path().substring(0,1)!="/") ) {
            $rootScope.log_link = {value:"Login"};
            $location.path( "/" );             
        }
        else
            $rootScope.log_link = {value:"Logout"}    
     }])
            
    ;
    