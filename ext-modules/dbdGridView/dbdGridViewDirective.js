"use strict";
angular.module("dbdGridViewModule").directive("dbdGridView", ['$state', '$timeout', 'scopeComService', '$rootScope',
  function ($state, $timeout, scopeComService, $rootScope) {
    return {
    	templateUrl: "ext-modules/dbdGridView/dbdGridViewTemplate.html",
      restrict: 'E',
      scope: {
        tableid: '@',
        tabletitle: '@',
        tabletitles: '=',
        tabledata: '=',
        ready: '@',
        lang: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function () {
              if ($scope.tabledata.mode=='editable')
                $scope.toolbar_width = "col-md-6";
              else
                $scope.toolbar_width = "col-md-12";

              $scope.tabletitle=$scope.tabletitles[$scope.lang];
              
              scopeComService.flush();
              $scope.addNewEntity = function(){
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView+'.new'+$scope.tabledata.entityC);
                }
              }
              $scope.view_entity= function(editline){
                scopeComService.add($scope.tabledata.data[editline][0].value);
                if ($scope.tabledata.mode=="deleted"){
                  $state.go($scope.tabledata.detailView+'.deleted'+$scope.tabledata.entityC);
                }
                else{
                  $state.go($scope.tabledata.detailView+'.view'+$scope.tabledata.entityC);
                }
              }
              $scope.edit_entity= function(editline){
                scopeComService.add($scope.tabledata.data[editline][0].value);
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView+'.edit'+$scope.tabledata.entityC);
                }
              }
              $scope.restore_entity= function(editline){
                //TODO : restore the deleted row 
              }
              $scope.delete_entity= function(editline){
                var entityName, entity="";
                entityName = $scope.tabledata.data[editline][1].value;
                entity=$scope.tabledata.entity;
                bootbox.confirm("Are you sure you want to delete " + entity + " <b>" + entityName +"</b> ?", function(ok){
                  if (ok){
                    scopeComService.add($scope.tabledata.data[editline][0].value);
                    $state.go($scope.tabledata.detailView+'.remove'+$scope.tabledata.entityC);
                  }
                });
              }
            }, 0);
          }
        });
        $rootScope.$watch('lang', function(newvalue, oldvalue){
          console.log("dbdGridViewModule: lang: ", newvalue);
          $scope.lang=$rootScope.lang;
          $scope.tabletitle=$scope.tabletitles[$scope.lang];
          //$scope.ready="false";
          //$scope.ready="true";
        });
      }
    }
  }]);