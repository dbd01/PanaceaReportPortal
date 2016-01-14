(function(){
  "use strict";
  
  angular.module("dbdGridViewModule").directive("dbdGridView", dbdGridView);
  dbdGridView.$inject= ['$state', '$timeout', 'scopeComService', '$rootScope', '$location', 'exceptionService'];
  function dbdGridView($state, $timeout, scopeComService, $rootScope, $location, exceptionService) {
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

              var mode=$scope.tabledata.mode;
              var customMessages={
                addNewEntityError:{
                  en:"Non valid mode: "+mode+" for add new entity.",
                  el:"Μη έγκυρη κατάσταση φόρμας: "+mode+" για προσθήκη νέας οντότητας."
                },
                editEntityError:{
                  en:"Non valid mode: "+mode+" for edit entity.",
                  el:"Μη έγκυρη κατάσταση φόρμας: "+mode+" για επεξεργασία οντότητας."
                },
                deleteEntityMessage:{
                  en:function(entityName, entity){
                    return "Are you sure you want to delete " + entity + " " + entityName +" ?"
                  },
                  el:function(entityName, entity){
                    return "Σίγουρα θέλετε να διαγράψετε την οντότητα " + entity + " " + entityName +" ;"
                  }
                }
              }
              
              $scope.addNewEntity = function(){
                if (mode=="deleted"){
                  exceptionService.catcher(customMessages.addNewEntityError[$rootScope.lang])(error);
                }
                else{
                  $state.go($scope.tabledata.detailView+'.new'+$scope.tabledata.entityC);
                }
              }
              $scope.view_entity= function(editline){
                var id=$scope.tabledata.data[editline][0].value;
                if (mode=="deleted"){
                  var path=$scope.tabledata.detailView+'/deleted/'+id;
                  $location.path(path);
                }
                else{
                  var path=$scope.tabledata.detailView+'/view/'+id;
                  $location.path(path);
                }
              }
              $scope.edit_entity= function(editline){
                var id=$scope.tabledata.data[editline][0].value;
                if (mode=="deleted"){
                  exceptionService.catcher(customMessages.editEntityError[$rootScope.lang])(error);
                }
                else{
                  var path=$scope.tabledata.detailView+'/edit/'+id;
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
                if (confirm(customMessages.deleteEntityMessage[$rootScope.lang](entityName, entity))){
                  var id=$scope.tabledata.data[editline][0].value;
                  var path=$scope.tabledata.detailView+'/remove/'+id;
                  $location.path(path);
                }
                /*bootbox.confirm("Are you sure you want to delete " + entity + " <b>" + entityName +"</b> ?", function(ok){
                  console.log(ok)
                  if (ok){
                    var id=$scope.tabledata.data[editline][0].value;
                    var path=$scope.tabledata.detailView+'/remove/'+id;
                    console.log("path:", path);
                    $location.path(path);
                  }
                });*/
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
        });
      }
    }
  };
})();