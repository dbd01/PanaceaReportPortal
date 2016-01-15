(function(){
"use strict";

  angular.module('PanaceaReports').factory("authInterceptorService", authService);
  authService.$inject= ['$injector','$rootScope', '$location', 'localStorageService', 'exceptionService'];

  function authService($injector, $rootScope, $location, localStorageService, exceptionService) {
    var customMessages={
      connectionExpiredError:{
        en:"Your allowed connection period has expired. Please login again.",
        el:"Η ισχύς της σύνδεσής σας έληξε. Παρακαλώ ξανασυνδεθείτε."
      },
      stateChangeFailedError:{
        en:function(toStateName){
          return "Routing to "+toStateName+" failed.";
        },
        el:function(toStateName){
          return "Η μετάβαση στην κατάσταση "+toStateName+" δεν είναι δυνατή.";
        },
      }
    };
    //executes each time a state transition (routing) occurs
    var state=null;
    //executes when the transition starts
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log("authInterceptorService : fromState: ", fromState.name);
      console.log("authInterceptorService :to state: ", toState.name, toParams);
      state=toState.name;
      if (state=="start.casGetCreds"){
        //casController should handle this case
        console.log("authInterceptorService: cas");
        $rootScope.authState='unauthorized';
        //TODO: casController dont execute to start.casGetCreds state transition. the following should execute from the controller
        event.preventDefault();
        localStorageService.set('authorizationData', { 
          token: toParams.token,
          expires: toParams.expires,
          log_name: toParams.user
        });
        $rootScope.authState='authorized';
        $rootScope.loginService='cas';
        $location.path('/welcome');
      }
      else if (state=='start'){
        //no redirection for start state, but set unauthorized flag
        console.log("authInterceptorService: state: start");
        //$rootScope.authState='unauthorized';
      }
      else{
        //for the rest states act accordingly based to existance of authData
        var authData = localStorageService.get('authorizationData');
        if (authData) {
          //authData exists therefore transition to requested state with authorized flag
          console.log("authInterceptorService: authorized");
          $rootScope.authState='authorized';
        }
        else {
          //no authData : transition to logged_out state , unauthorized flag
          console.log("authInterceptorService: unauthorized");
          exceptionService.catcher(customMessages.connectionExpiredError[$rootScope.lang])(null);
          event.preventDefault();
          $rootScope.authState='unauthorized';
          $location.path('/');
        }
      }
    });
    //executes when the transition gets completed successfully
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      console.log("authInterceptorService: stateChangeSuccess");
    });
    //executes when the transition fails
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      exceptionService.catcher(customMessages.stateChangeFailedError[$rootScope.lang](toState.name))(error);
    });
    var quest = {};
    var _request  = function (config) {
      var authData = localStorageService.get('authorizationData');
      //authData validation
      if (authData && (Date.now() > authData.expires )){
        //if token has expired, clear auth data..
        console.log("authInterceptorService : _request: token expired");
        exceptionService.catcher(customMessages.connectionExpiredError[$rootScope.lang])(null);
        authData=null;
        $rootScope.log_link.value="Login"; 
        $location.path('/login');
        localStorageService.set('authorizationData', null);
      }
      if (authData) {
        console.log("authInterceptorService: _request: authData: ", authData);
        config.headers = { 
          'Content-Type': 'application/json',
          'x-access-token': localStorageService.get('authorizationData').token
        }
        console.log("authInterceptorService: state: ", state)
        //set headers if deleted records are asked
        if (state && state.indexOf("deleted")>-1){
          config.headers["deleted"]=true;
        }
      }
      return config;
    }
    console.log("authInterceptorService: request");
    quest.request = _request;
    return quest;
  }
})();