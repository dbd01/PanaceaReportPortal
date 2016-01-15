angular.module('PanaceaReports').factory('exceptionService', exceptionService);

exceptionService.$inject = ['$log'];

function exceptionService($log) {
  var service = {
    catcher: catcher
  };
  return service;

  function catcher(message) {
    return function(error) {
      $log.error(message, error);
      var errMsg=message;
      if (error){
        if (error.status){
          errMsg+=" Status: "+error.status;
        }
        if (error.statusText){
          errMsg+=" StatusText: "+error.statusText;
        }
        if (error.data){
          if (error.data.message)
            errMsg+="Message : "+error.data.message;
        }
      }
      bootbox.alert(errMsg, function(ok) { });
    };
  }
}