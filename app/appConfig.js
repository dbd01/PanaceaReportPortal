(function (ng) {
  "use strict";

  /* $exceptionHandler decorator*/
  ng.module('PanaceaReports').config(exceptionConfig);
  exceptionConfig.$inject = ['$provide'];
  function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }
  extendExceptionHandler.$inject = ['$delegate'];
  function extendExceptionHandler($delegate) {
    return function(exception, cause) {
      $delegate(exception, cause);//execute the default behaviour
      /*var errorData = {
        exception: exception,
        cause: cause
      };*/
      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       */
      //toastr.error(exception.msg, errorData);

      //cannot use services (exceptionService) on .config because they dont exist yet
      //bootbox.alert(cause+" : "+exception, function(ok) { });
      console.log(cause+" : "+exception);
    };
  }

  /*authInterceptorService to provide authorization data for each request*/
  ng.module('PanaceaReports').config(authInterceptorConfig);
  authInterceptorConfig.$inject= ['$httpProvider'];
  function authInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  ng.module('PanaceaReports').config(localStorageServiceConfig);
  localStorageServiceConfig.$inject= ['localStorageServiceProvider'];
  function localStorageServiceConfig(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }

  ng.module('PanaceaReports').run(appRun);
  appRun.$inject= ['$rootScope', 'gettextCatalog', 'dbdMenuCommServiceOut', 'dbdGridViewCommServiceOut', 'localStorageService', 
    '$log', '$location'];
  function appRun($rootScope, gettextCatalog, dbdMenuCommServiceOut, dbdGridViewCommServiceOut, localStorageService, $log, $location){
    $rootScope.log_link = {value:"Logout"};
    gettextCatalog.debug = true;
    console.log("config : lang: ", $rootScope.lang);
    var lang=localStorageService.get('lang');
    if (!lang)
      lang='el';
    gettextCatalog.setCurrentLanguage(lang);
    dbdMenuCommServiceOut.setLang(lang);
    dbdGridViewCommServiceOut.setLang(lang);
    localStorageService.set('lang', lang);
  }
})(angular);