(function(){
  "use strict";
  
  angular.module("dbdAccordionModule").directive("dbdAccordionPane", dbdAccordionPane);
  dbdAccordionPane.$inject= ['$timeout', '$rootScope'];
  function dbdAccordionPane($timeout, $rootScope) {
    return {
      transclude: true,
      restrict: 'E',
      template: "<div></div>",
      scope: {
        ready: '@',
        lang: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function() {
              //generateAccordion();
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