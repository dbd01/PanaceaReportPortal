(function(){
"use strict";

  angular.module('PanaceaReports').controller("reportsAccordionController", reportsAccordionController);
  reportsAccordionController.$inject= ['$scope', 'reportsAccordionService'];
  function reportsAccordionController($scope, reportsAccordionService) {
    var accordionObj={
      "data":[],
      "ready":false
    };
    reportsAccordionService.then(
      function (data){
        accordionObj.data=data;
        accordionObj.ready=true;
        $scope.accordionObj = accordionObj;
        console.log("AccordionController: AccordionService: accordionObj: ", $scope.accordionObj)
      },
      function (error){
        console.log("error: ", error)
      });
  };
})();