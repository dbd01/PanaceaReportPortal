"use strict";

app
    .config(['$httpProvider',function ($httpProvider) {
        //$httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
    