"use strict";
angular.module("dbdGridViewModule").directive("dbdGridView", ['$state', '$timeout', 'scopeComService',
  function ($state, $timeout, scopeComService) {
    return {
    	transclude: true,
    	templateUrl: "ext-modules/dbdGridView/dbdGridViewTemplate.html",
      restrict: 'E',
      scope: {
        tableid: '@',
        tabletitle: '@',
        tabledata: '=',
        ready: '@',
        tableresult: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function () {
            	console.log("papari")
              if ($scope.tabledata.mode=='editable')
                $scope.toolbar_width = "col-md-6";
              else
                $scope.toolbar_width = "col-md-12";

              scopeComService.flush();
              $scope.addNewEntity = function(){
              	console.log("papari")
                scopeComService.add("add");
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView);
                }
              }
              $scope.view_entity= function(editline){
                scopeComService.add("view");
                scopeComService.add($scope.tabledata.data[editline][0].value);
                if ($scope.tabledata.mode=="deleted"){
                  scopeComService.add("deleted");
                  $state.go($scope.tabledata.detailViewDeleted);
                }
                else{
                  $state.go($scope.tabledata.detailView);
                }
              }
              $scope.edit_entity= function(editline){
                scopeComService.add("edit");
                scopeComService.add($scope.tabledata.data[editline][0].value);
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView);
                }
              }
              $scope.restore_entity= function(editline){
                //TODO : restore the deleted row 
              }
              $scope.create_permission= function(editline){
                if ($state.includes('requestedPermissions')){
                  scopeComService.add("add_requested");
                  scopeComService.add($scope.tabledata.data[editline][1].value);
                  $state.go('permissionInfo'); 
                }
              }
              $scope.delete_entity= function(editline){
                var entityName, entity="";
                entityName = $scope.tabledata.data[editline][1].value;
                entity=$scope.tabledata.entity;
                bootbox.confirm("Are you sure you want to delete " + entity + " <b>" + entityName +"</b> ?", function(ok){
                  if (ok){
                    scopeComService.add("remove");
                    scopeComService.add($scope.tabledata.data[editline][0].value);
                    $state.go($scope.tabledata.detailViewRemove);
                  }
                });
              }
            }, 0);
          }
        })
      }
    }
  }]);