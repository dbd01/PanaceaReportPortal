(function(){
"use strict";

  angular.module('PanaceaReports').controller("reportsAccordionController", reportsAccordionController);
  reportsAccordionController.$inject= ['$scope', '$element' ];
  function reportsAccordionController($scope, $element) {
    var accordionObj={
      "data":[],
      "ready":false
    };

    var accoTitles=$element.find(".accotitle");
    var accoContents=$element.find(".accocontent");

    if (accoTitles.length!=accoContents.length){
      //error
    }
    else{
      for (var i = 0; i < accoTitles.length; i++) {
        var accoItem={
          title: accoTitles[i],
          data: accoContents[i]
        }
        
        accordionObj.data.push(accoItem);
      };

      accordionObj.ready=true;
      $scope.accordionObj = accordionObj;
      console.log("AccordionController: AccordionService: accordionObj: ", $scope.accordionObj)
    }
  };
})();