"use strict";
angular.module("dbdDetailViewModule").directive("dbdDetailView", ['$state', 'scopeComService', '$timeout',
  function ($state, scopeComService, $timeout) {
    return {
      restrict: 'E',
      template: '<div ng-include="getContentUrl()"></div>',
      scope: { 
        tableid: '@',
        tabledata: '=',
        ready: '@'
      },
      link: function ($scope) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function(){
              $scope.getContentUrl=function (){
                return $scope.tabledata.detailViewTemplate;
              }
              var mode=$scope.tabledata.state|| $state.current.name;
              if (mode.indexOf("edit")>-1){
                $scope.previousData=$scope.tabledata.entity;
                $scope.mode="edit";
              }
              else if (mode.indexOf("view")>-1){
                $scope.previousData=$scope.tabledata.entity;
                $scope.mode="view";
              }
              else if (mode.indexOf("deleted")>-1){
                $scope.previousData=$scope.tabledata.entity;
                $scope.mode="deleted";
              }
              else if (mode.indexOf("new")>-1){
                $scope.previousData=null;
                $scope.mode="new";
              }
              else {
               //error
              }
              scopeComService.flush();
              
              $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.tabledata.entity=null;
              }
              $scope.add = function(){
                scopeComService.add(null);
                scopeComService.add($scope.tabledata.entity);
                $state.go($scope.tabledata.detailView+'.add');
              };
              $scope.update = function(){
                scopeComService.add($scope.tabledata.entity._id);
                scopeComService.add($scope.tabledata.entity);
                $state.go($scope.tabledata.detailView+'.update');
              }
              $scope.edit = function(){
                scopeComService.add($scope.tabledata.entity._id);
                $state.go($scope.tabledata.detailView+'.edit');
              }
              $scope.cancelEdit = function(){
                scopeComService.add($scope.tabledata.entity._id);
                if ($scope.mode.indexOf('deleted')>-1){
                  $state.go($scope.tabledata.gridView+'.deleted');
                }
                else{
                  $state.go($scope.tabledata.gridView+'.all');
                }
              }
              $scope.cancelAdd = function(){
                $state.go($scope.tabledata.gridView+'.all');
              }
              $scope.cancelUpdate = function(){
                $scope.tabledata.entity=$scope.previousData;
                scopeComService.add($scope.tabledata.entity._id);
                $state.go($scope.tabledata.detailView+'.view');
              }
            },0);
          }
        });
      }
    }
  }]);