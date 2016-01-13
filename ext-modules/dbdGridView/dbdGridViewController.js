(function(){
  'use strict';

  angular.module("dbdGridViewModule").controller("dbdGridViewController",['$scope',
    function ($scope) {
      $scope.$watch('ready', function (newvalue, oldvalue) {
        if (newvalue=="true") {
          if ($scope.tabledata.mode=='editable'){
            $scope.tabledata.header.push({"title": {en:"View", el:"Προβολή"}, "showIt": true });
            $scope.tabledata.header.push({"title": {en:"Edit", el:"Επεξεργασία"}, "showIt": true });
            $scope.tabledata.header.push({"title": {en: "Delete", el: "Διαγραφή"}, "showIt": true });

            $scope.tabledata.headers.push({"title": "", "showIt": true });
            $scope.tabledata.headers.push({"title": "", "showIt": true });
            $scope.tabledata.headers.push({"title": "", "showIt": true })
          }
          else if ($scope.tabledata.mode=='deleted'){
            $scope.tabledata.header.push({"title": {en:"View", el:"Προβολή"}, "showIt": true });
            $scope.tabledata.header.push({"title": {en:"Restore", el:"Επαναφορά"}, "showIt": true });

            $scope.tabledata.headers.push({"title": "", "showIt": true });
            $scope.tabledata.headers.push({"title": "", "showIt": true });
          }
          for (var i = 0; i < $scope.tabledata.header.length; i++) {
            $scope.tabledata.headers[i].title=$scope.tabledata.header[i].title[$scope.lang];
          };
          console.log($scope.tabledata.headers);
          $scope.tabletitle=$scope.tabletitles[$scope.lang];
        }
      });
    }]);
})();