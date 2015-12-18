"use strict";
app.directive('applicationinfo', ['$state', 'scopeComService', '$timeout',
  function ($state, scopeComService, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/applications/views/applicationInfoTemplate.html',
      scope: { 
        tableid: '@',
        tabledata: '=',
        ready: '@'
      },
      link: function ($scope) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function(){
              var mode=$state.current.name;
              $scope.groups =$scope.tabledata.groups;
              if (mode.indexOf("edit")>-1){
                $scope.applicationData= $scope.tabledata.application;
                $scope.previousData=$scope.tabledata.application;
                $scope.mode="edit";
              }
              else if (mode.indexOf("view")>-1){
                $scope.applicationData= $scope.tabledata.application;
                $scope.previousData=$scope.tabledata.application;
                $scope.mode="view";
              }
              else if (mode.indexOf("deleted")>-1){
                $scope.applicationData= $scope.tabledata.application;
                $scope.previousData=$scope.tabledata.application;
                $scope.mode="deleted";
              }
              else if (mode.indexOf("new")>-1){
                $scope.previousData=null;
                $scope.applicationData={
                  "_id":'',
                  "name":'',
                  "description":'',
                  "url":'',
                  "groups": []
                };
                $scope.mode="new";
              }
              else {
               //error
              }
              scopeComService.flush();
              
              $scope.groupzIDz =[];
              $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.applicationData={
                  "_id":'',
                  "name":'',
                  "description":'',
                  "url":'',
                  "groups": []
                };
              }
              $scope.add = function(){
                for (var i=0; i< $scope.applicationData.groups.length; i++){
                  $scope.groupzIDz[i] = $scope.applicationData.groups[i]._id; 
                }
                $scope.applicationData.groups=$scope.groupzIDz;
                scopeComService.add(null);
                scopeComService.add($scope.applicationData);
                $state.go('applicationInfo.add');
              };
              $scope.update = function(){
                for (var i=0; i< $scope.applicationData.groups.length; i++){
                  $scope.groupzIDz[i] = $scope.applicationData.groups[i]._id; 
                }
                $scope.applicationData.groups=$scope.groupzIDz;
                scopeComService.add($scope.applicationData._id);
                scopeComService.add($scope.applicationData);
                $state.go('applicationInfo.update');
              }
              $scope.edit = function(){
                scopeComService.add($scope.applicationData._id);
                $state.go('applicationInfo.edit');
              }
              $scope.cancelEdit = function(){
                scopeComService.add($scope.applicationData._id);
                if ($scope.mode.indexOf('deleted')>-1){
                  $state.go('applications.deleted');
                }
                else{
                  $state.go('applications.all');
                }
              }
              $scope.cancelAdd = function(){
                $state.go('applications.all');
              }
              $scope.cancelUpdate = function(){
                $scope.applicationData=$scope.previousData;
                scopeComService.add($scope.applicationData._id);
                $state.go('applicationInfo.view');
              }
            },0);
          }
        });
      }
    }
  }]);