(function(){
  "use strict";
  
  angular.module("dbdAccordionModule").directive("dbdAccordion", dbdAccordion);
  dbdAccordion.$inject= ['$state', '$timeout', '$rootScope', 'exceptionService'];
  function dbdAccordion($state, $timeout, $rootScope, exceptionService) {
    return {
      controller:"dbdAccordionController",
      //transclude: true,
      templateUrl: "ext-modules/dbdAccordion/dbdAccordionTemplate.html",
      restrict: 'E',
      scope: {
        data: '=',
        lang: '=',
        ready: '@',
        lang: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function() {
              console.log("dbdAccordion: ready3: ", newvalue)
              generateAccordion();
            }, 0);
          }
        });
        function generateAccordion() {
          console.log("element: ", element)
          $(element).accordion({
            header: "> div > h3"
          });
        }
        $rootScope.$watch('lang', function(newvalue, oldvalue){
          $scope.lang=$rootScope.lang;
        });
      }
    }
  };
})();