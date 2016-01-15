(function(){
  "use strict";
  
  angular.module("dbdAccordionModule").directive("dbdAccordion", dbdAccordion);
  dbdAccordion.$inject= ['$timeout', '$rootScope'];
  function dbdAccordion($timeout, $rootScope) {
    return {
      transclude: true,
      restrict: 'E',
      template:"<div></div>",
      scope: {
        ready: '@',
        lang: '='
      },
      link: function ($scope, element, attrs) {
        $timeout(function() {
          generateAccordion();
        }, 0);
        
        function generateAccordion() {
          console.log('element: ',element);
          $(element).accordion({
            header: "h3"
          });
        }
        $rootScope.$watch('lang', function(newvalue, oldvalue){
          $scope.lang=$rootScope.lang;
        });
      }
    }
  };
})();