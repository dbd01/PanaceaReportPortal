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
        data:'=',
        ready: '@',
        lang: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            //$timeout(function() {
              generateData(function(){
                generateAccordion();
              });
            //}, 0);
          }
        });

        function generateData(cb){
          //console.log($scope.accodata)
          for (var i = 0; i < $scope.data.length; i++) {
            $scope.data[i].title = $sce.trustAsHtml($scope.data[i].title.innerHTML);
            $scope.data[i].data = $sce.trustAsHtml($scope.data[i].data.innerHTML);
          };
          console.log($scope.data)
          cb();
        };

        function generateAccordion() {
          $timeout(function() {   //<--- used $timeout to make sure ng-repeat is REALLY finished
            $(element).accordion({
              header: "> div > h3"
            });
           });
         }

        $rootScope.$watch('lang', function(newvalue, oldvalue){
          $scope.lang=$rootScope.lang;
        });
      }
    }
  };
})();