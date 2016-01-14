angular.module('PanaceaReports').factory('exceptionService', exceptionService);

exceptionService.$inject = ['$log'];

function exceptionService($log) {
  var service = {
    catcher: catcher
  };
  return service;

  function catcher(message) {
    return function(reason) {
      $log.error(message, reason);
      alert(message, reason);
    };
  }
}