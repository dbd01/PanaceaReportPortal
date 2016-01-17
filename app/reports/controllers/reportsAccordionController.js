(function(){
"use strict";

  angular.module('PanaceaReports').controller("reportsAccordionController", reportsAccordionController);
  reportsAccordionController.$inject= ['$scope', '$element', 'exceptionService', '$rootScope' ];
  function reportsAccordionController($scope, $element, exceptionService, $rootScope) {
    var customMessages={
      sillyMessage:{
        en:"fjdsoifodisfjoisdfj",
        el:"φξδσοιφοδισφξοισδφξ"
      },
    };
    var accordionObj={
      "accohtml":[],
      "ready":false
    };

    var accohtml=$element.find(".accocontent");

    accordionObj.accohtml=accohtml;
    accordionObj.ready=true;

    $scope.accordionObj = accordionObj;

    $scope.add = function(){
      exceptionService.catcher(customMessages.sillyMessage[$rootScope.lang])(null);
    };
  };
})();