(function(){
"use strict";

  angular.module('PanaceaReports').controller("accordionController", accordionController);
  accordionController.$inject= ['$scope', 'accordionService'];
  function accordionController($scope, accordionService) {
    var accordionObj={
    	"data":[],
      "ready":false
    };
    accordionObj.data=accordionService;
    accordionObj.ready=true;
    $scope.accordionObj = accordionObj;
  };
})();