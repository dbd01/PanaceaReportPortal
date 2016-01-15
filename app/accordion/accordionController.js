(function(){
"use strict";

  angular.module('PanaceaReports').controller("accordionController", accordionController);
  accordionController.$inject= ['$scope', 'accordionService'];
  function accordionController($scope, accordionService) {
    var accordionObj={
      "ready":false
    };
    accordionObj.ready=true;
    $scope.accordionObj = accordionObj;
  };
})();