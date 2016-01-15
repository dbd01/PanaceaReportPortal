(function(){
"use strict";

  angular.module('dbdAccordionModule').controller("dbdAccordionController", dbdAccordionController);
  dbdAccordionController.$inject= ['$scope', 'dbdAccordionService'];
  function dbdAccordionController($scope, dbdAccordionService) {
    var accordionObj={
      "data":[],
      "ready":false
    };
    dbdAccordionService.then(
      function (data){
        accordionObj.data=data;
        accordionObj.ready=true;
        $scope.accordionObj = accordionObj;
        console.log("dbdAccordionController: dbdAccordionService: accordionObj: ", $scope.accordionObj)
      },
      function (error){
        console.log("error: ", error)
      });
  };
})();