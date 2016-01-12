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
.run(['$rootScope', 'gettextCatalog', function($rootScope, gettextCatalog){
  console.log("app.config : run");
  $rootScope.log_link = {value:"Logout"};
  gettextCatalog.setCurrentLanguage('el');
  gettextCatalog.debug = true;
}]);