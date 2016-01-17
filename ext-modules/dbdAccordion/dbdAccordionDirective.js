(function(){
  "use strict";
  
  angular.module("dbdAccordionModule").directive("dbdAccordion", dbdAccordion);
  dbdAccordion.$inject= ['$timeout', '$rootScope', '$sce'];
  function dbdAccordion($timeout, $rootScope, $sce) {
    return {
      transclude: true,
      restrict: 'E',
      templateUrl:"ext-modules/dbdAccordion/dbdAccordionTemplate.html",
      scope: {
        accohtml:'=',
        ready: '@',
        lang: '='
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

        $rootScope.$watch('lang', function(newvalue, oldvalue){
          $scope.lang=$rootScope.lang;
        });
      }
    }
  };
})();