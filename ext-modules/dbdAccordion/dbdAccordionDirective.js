(function(){
  "use strict";
  
  angular.module("dbdAccordionModule").directive("dbdAccordion", dbdAccordion);
  dbdAccordion.$inject= ['$timeout'];
  function dbdAccordion($timeout) {
    return {
      transclude: true,
      restrict: 'E',
      template:"<div ng-transclude></div>",
      scope: {
        accohtml:'=',
        ready: '@'
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            generateAccordion();
          }
        });

        function generateAccordion() {
          $timeout(function() {   //<--- used $timeout to make sure ng-repeat is REALLY finished
            $scope.accohtml.accordion();
           });
         }
      }
    }
  };
})();