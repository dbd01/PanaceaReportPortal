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

    console.log(accoTitles);
    console.log(accoContents);

    if (accoTitles.length!=accoContents.length){
      //error
    }
    else{
      for (var i = 0; i < accoTitles.length; i++) {
        var accoTitleStr=accoTitles[i].innerHTML;
        accoTitles[i].innerHTML="";
        var accoContentStr=accoContents[i].innerHTML;
        accoContents[i].innerHTML="";

        console.log(accoTitleStr);
        console.log(accoContentStr);

        var accoItem={
          title: accoTitleStr,
          data: accoContentStr
        }
        
        accordionObj.data.push(accoItem);
      };

      accordionObj.ready=true;
      $scope.accordionObj = accordionObj;
      console.log("AccordionController: AccordionService: accordionObj: ", $scope.accordionObj)
    }
  };
})();