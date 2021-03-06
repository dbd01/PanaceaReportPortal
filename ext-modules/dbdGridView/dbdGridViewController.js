﻿(function(){
  'use strict';

  angular.module("dbdGridViewModule").controller("dbdGridViewController",dbdGridViewController);
  dbdGridViewController.$inject= ['$scope'];
  function dbdGridViewController($scope) {
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
        
        $scope.tabletitle=$scope.tabletitles[$scope.lang];
      }
    });
  };
})();