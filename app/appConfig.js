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
.run(['$rootScope', 'gettextCatalog', 'dbdMenuCommServiceOut', 'dbdGridViewCommServiceOut', 'localStorageService',
  function($rootScope, gettextCatalog, dbdMenuCommServiceOut, dbdGridViewCommServiceOut, localStorageService){
  console.log("app.config : run");
  $rootScope.log_link = {value:"Logout"};
  gettextCatalog.debug = true;
  console.log("config : lang: ", $rootScope.lang)
  var lang=localStorageService.get('lang');
  if (!lang)
    lang='el';
  gettextCatalog.setCurrentLanguage(lang);
  dbdMenuCommServiceOut.setLang(lang);
  dbdGridViewCommServiceOut.setLang(lang);
  localStorageService.set('lang', lang);
}]);