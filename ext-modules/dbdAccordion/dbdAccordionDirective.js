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
        accoelem:'=',
        ready: '@'
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function () {
              generateAccordion();
            }, 0);
          }
        });

        function generateAccordion() {
          $scope.accoelem.accordion();
        }
      }
    }
  };
})();