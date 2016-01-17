(function(){
  "use strict";
  
  angular.module("dbdAccordionModule").directive("dbdAccordionPane", dbdAccordionPane);
  dbdAccordionPane.$inject= ['$timeout', '$rootScope'];
  function dbdAccordionPane($timeout, $rootScope) {
    return {
      transclude: true,
      restrict: 'E',
      template: "ext-modules/dbdAccordion/dbdAccordionPaneTemplate.html",
      scope: {
        ready: '@',
        lang: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function() {
              
            }, 0);
          }
        });
       
        $rootScope.$watch('lang', function(newvalue, oldvalue){
          $scope.lang=$rootScope.lang;
        });
      }
    }
  };
})();