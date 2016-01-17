(function(){
"use strict";

  angular.module('PanaceaReports').controller("reportsAccordionController", reportsAccordionController);
  reportsAccordionController.$inject= ['$scope', '$element', 'exceptionService', '$rootScope' ];
  function reportsAccordionController($scope, $element, exceptionService, $rootScope) {
    var customMessages={
      differentTitlesContentsLenthError:{
        en:"Use one accotitle element for each accocontent element in your view.",
        el:"Βάλε ένα accotitle element για κάθε accocontent element στο view σου."
      },
    };
    var accordionObj={
      "accohtml":[],
      "ready":false
    };

    var accohtml=$element.find(".accocontent");

    console.log(accohtml);

    accordionObj.accohtml=accohtml;

    accordionObj.ready=true;
    $scope.accordionObj = accordionObj;

    $scope.add = function(){
      exceptionService.catcher("fjdsoifodisfjoisdfj")(null);
    };
  };
})();