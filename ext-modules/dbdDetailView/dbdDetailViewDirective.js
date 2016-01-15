(function(){
"use strict";
  angular.module("dbdDetailViewModule").directive("dbdDetailView", dbdDetailView);
  dbdDetailView.$inject= ['$state', 'scopeComService', '$timeout'];
  
  function dbdDetailView($state, scopeComService, $timeout) {
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
              var mode=$scope.tabledata.state || $state.current.name;
              var context=$scope.tabledata.context || null;
              if (context){
                $scope.context=context;
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
              }
              else{
                //error
                console.log("no context for detailView")
              }
              
              $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.tabledata.entity=null;
              }
              $scope.add = function(){
                scopeComService.add($scope.tabledata.entity);
                $state.go($scope.tabledata.detailView+'.add'+$scope.tabledata.entityC);
              };
              $scope.update = function(){
                scopeComService.add($scope.tabledata.entity);
                var id=$scope.tabledata.entity._id;
                var stateStr=$scope.tabledata.detailView+".update"+$scope.tabledata.entityC;
                $state.go(stateStr, {'id':id});
              }
              $scope.edit = function(){
                var id=$scope.tabledata.entity._id;
                var stateStr=$scope.tabledata.detailView+".edit"+$scope.tabledata.entityC;
                $state.go(stateStr, {'id':id});
              }
              $scope.cancelEdit = function(){
                if ($scope.mode.indexOf('deleted')>-1){
                  $state.go($scope.tabledata.gridView+'.deleted'+$scope.tabledata.entityCP);
                }
                else{
                  $state.go($scope.tabledata.gridView+'.all'+$scope.tabledata.entityCP);
                }
              }
              $scope.cancelAdd = function(){
                $state.go($scope.tabledata.gridView+'.all'+$scope.tabledata.entityCP);
              }
              $scope.cancelUpdate = function(){
                $scope.tabledata.entity=$scope.previousData;
                var id=$scope.tabledata.entity._id;
                var stateStr=$scope.tabledata.detailView+".view"+$scope.tabledata.entityC;
                $state.go(stateStr, {'id':id});
              }
            },0);
          }
        });
      }
    }
  };
})();