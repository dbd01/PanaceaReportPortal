﻿"use strict";

app
    .config(['$httpProvider',function ($httpProvider) {
        //$httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
     }])
    .run(['$rootScope', 'localStorageService', function($rootScope, localStorageService){
        if (localStorageService.get('authorizationData').token==null)
            $rootScope.log_link = {value:"Login"}
        else
            $rootScope.log_link = {value:"Logout"}
     }])
    ;
    