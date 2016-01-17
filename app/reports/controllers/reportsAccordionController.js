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
      "html_array":[],
      "ready":false
    };

    var accoTitles=$element.find(".accotitle");
    var accoContents=$element.find(".accocontent");

    if (accoTitles.length!=accoContents.length){
      exceptionService.catcher(customMessages.differentTitlesContentsLenthError[$rootScope.lang])(null);
    }
    else{
      for (var i = 0; i < accoTitles.length; i++) {
        var accoItem={
          title: accoTitles[i],
          htmlContent: accoContents[i]
        }
        
        accordionObj.html_array.push(accoItem);
      };

      accordionObj.ready=true;
      $scope.accordionObj = accordionObj;
    }
  };
})();