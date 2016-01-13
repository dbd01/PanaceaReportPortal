﻿"use strict";

angular.module('PanaceaReports').config(exceptionConfig);
exceptionConfig.$inject = ['$provide'];
function exceptionConfig($provide) {
  $provide.decorator('$exceptionHandler', extendExceptionHandler);
}
extendExceptionHandler.$inject = ['$delegate'];
function extendExceptionHandler($delegate) {
  return function(exception, cause) {
    $delegate(exception, cause);
    var errorData = {
      exception: exception,
      cause: cause
    };
    /**
     * Could add the error to a service's collection,
     * add errors to $rootScope, log errors to remote web server,
     * or log locally. Or throw hard. It is entirely up to you.
     * throw exception;
     */
    //toastr.error(exception.msg, errorData);
    alert(exception, errorData);
  };
};

angular.module('PanaceaReports').config(authInterceptorConfig);
authInterceptorConfig.$inject= ['$httpProvider'];
function authInterceptorConfig($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common = 'Content-Type: application/json';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
};

angular.module('PanaceaReports').config(localStorageServiceConfig);
localStorageServiceConfig.$inject= ['localStorageServiceProvider']
function localStorageServiceConfig(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
};

angular.module('PanaceaReports').run(appRun);
appRun.$inject= ['$rootScope', 'gettextCatalog', 'dbdMenuCommServiceOut', 'dbdGridViewCommServiceOut', 'localStorageService', 
  '$log', '$location'];
function appRun($rootScope, gettextCatalog, dbdMenuCommServiceOut, dbdGridViewCommServiceOut, localStorageService, $log, $location){
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

  var handlingRouteChangeError = false;

  function handleRoutingErrors() {
    /**
     * Route cancellation:
     * On routing error, go to the dashboard.
     * Provide an exit clause if it tries to do it twice.
     */
    $rootScope.$on('$stateChangeError',
      function(event, current, previous, rejection) {
        if (handlingRouteChangeError) { return; }
        handlingRouteChangeError = true;
        var destination = (current && (current.title ||
          current.name || current.loadedTemplateUrl)) ||
        'unknown target';
        var msg = 'Error routing to ' + destination + '. ' +(rejection.msg || '');
        /**
         * Optionally log using a custom service or $log.
         * (Don't forget to inject custom service)
         */
        $log.warning(msg, [current]);

        /**
         * On routing error, go to another route/state.
         */
        $location.path('/');
      });
  }
};