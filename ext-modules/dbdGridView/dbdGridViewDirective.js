"use strict";
angular.module("dbdGridViewModule").directive("dbdGridView", ['$state', '$timeout', 'scopeComService', '$rootScope', '$location', 'DTOptionsBuilder',
  function ($state, $timeout, scopeComService, $rootScope, $location, DTOptionsBuilder) {
    return {
      controller: "dbdGridViewController",
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
              //$scope.tabletitle=$scope.tabletitles[$scope.lang];
              //scopeComService.flush();
              // apply DataTable options, use defaults if none specified by user
              /*var options = {};
                options = {
                  "bStateSave": true,
                  "iCookieDuration": 2419200, //1 month 
                  "bJQueryUI": true,
                  "bPaginate": false,
                  "bLengthChange": false,
                  "bFilter": false,
                  "bInfo": false,
                  "bDestroy": true
                };*/
              var table = $('#' + $scope.tableid);
              //var oTable = table.dataTable(options);
              var oTable = table.dataTable();

              if ($scope.tabledata.mode=='editable')
                $scope.toolbar_width = "col-md-6";
              else
                $scope.toolbar_width = "col-md-12";

              $scope.addNewEntity = function(){
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView+'.new'+$scope.tabledata.entityC);
                }
              }
              $scope.view_entity= function(editline){
                var id=$scope.tabledata.data[editline][0].value;
                //scopeComService.add(id);
                if ($scope.tabledata.mode=="deleted"){
                  //$state.go($scope.tabledata.detailView+'.deleted'+$scope.tabledata.entityC);
                  var path=$scope.tabledata.detailView+'/deleted/'+id;
                  console.log("path:", path);
                  $location.path(path);
                }
                else{
                  //$state.go($scope.tabledata.detailView+'.view'+$scope.tabledata.entityC);
                  var path=$scope.tabledata.detailView+'/view/'+id;
                  console.log("path:", path);
                  $location.path(path);
                }
              }
              $scope.edit_entity= function(editline){
                var id=$scope.tabledata.data[editline][0].value;
                //scopeComService.add(id);
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  //$state.go($scope.tabledata.detailView+'.edit'+$scope.tabledata.entityC);
                  var path=$scope.tabledata.detailView+'/edit/'+id;
                  console.log("path:", path);
                  $location.path(path);
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
                    var id=$scope.tabledata.data[editline][0].value;
                    //scopeComService.add(id);
                    //$state.go($scope.tabledata.detailView+'.remove'+$scope.tabledata.entityC);
                    var path=$scope.tabledata.detailView+'/remove/'+id;
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
          if ($scope.tabledata){
            for (var i = 0; i < $scope.tabledata.header.length; i++) {
              $scope.tabledata.headers[i].title=$scope.tabledata.header[i].title[$scope.lang];
            };
          }
          
          //$scope.ready="false";
          //$scope.ready="true";
        });
      }
    }
  }]);