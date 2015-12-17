"use strict";
app.directive('applicationinfo', ['$state', 'localStorageService' , 'applicationsService',  'scopeComService', '$timeout',
  function ($state, localStorageService, applicationsService,  scopeComService, $timeout) {
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
              var table = $('#' + $scope.tableid);
              $scope.groups =$scope.tabledata.groups;
              $scope.mode = scopeComService.list[0];
              if ($scope.mode=="edit"){
                $scope.applicationData= $scope.tabledata.application;
                $scope.previousData=$scope.tabledata.application;
              }
              else if ($scope.mode=="view"){
                $scope.applicationData= $scope.tabledata.application;
                $scope.previousData=$scope.tabledata.application;
                if (scopeComService.list.length==2)
                  $scope.deletedData=true;
                else
                  $scope.deletedData=false;
              }
              else {
                $scope.previousData=null;
                $scope.applicationData={
                  "_id":'',
                  "name":'',
                  "description":'',
                  "url":'',
                  "groups": []
                };
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
                $scope.applicationAddData={
                  "name":$scope.applicationData.name,
                  "description": $scope.applicationData.description,
                  "url": $scope.applicationData.url,
                  "groups": $scope.groupzIDz
                }
                applicationsService.add($scope.applicationAddData, function (response) {
                  console.log("Application has been added successfully!");
                  $state.go('applications.all');
                },function (response) {
                  console.log($scope.applicationAddData);
                  if (response.data == null){
                    console.log("response data is null!!!!!");
                    $scope.alert = { 
                      type: 'danger',
                      msg: 'No response from server'
                    };
                  }
                  else{
                    console.log("response ->", response);
                    $scope.alert = {
                      type: 'danger', 
                      msg: response.data.message 
                    };
                  }
                });
              };
              $scope.update = function(){
                for (var i=0; i< $scope.applicationData.groups.length; i++){
                  $scope.groupzIDz[i] = $scope.applicationData.groups[i]._id; 
                }
                $scope.updateData={
                  "name":$scope.applicationData.name,
                  "description": $scope.applicationData.description,
                  "url": $scope.applicationData.url,
                  "groups": $scope.groupzIDz
                }
                applicationsService.update({ applicationId: $scope.applicationData._id }, $scope.updateData, function (response) {
                  console.log("Application has been updated successfully.");
                  console.log("update data=>", $scope.updateData);
                  $state.go('applications.all');
                },function (response) {
                  console.log("err update -->", $scope.updateData);
                  if (response.data == null){
                    console.log("response data is null!!!!!");
                    $scope.alert = {
                      type: 'danger',
                      msg: 'No response from server'
                    };
                  }
                  else{
                    $scope.alert = {
                      type: 'danger',
                      msg: response.data.message
                    };
                  }
                });
              }
              $scope.edit = function(){
                console.log("mode from : "+$scope.mode+" to edit");
                $scope.mode="edit";
              }
              $scope.cancelEdit = function(){
                if ($scope.deletedData){
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
                //console.log("previousData2: ", $scope.previousData)
                //console.log("applicationData: ", $scope.applicationData)
                //console.log("mode from : "+$scope.mode+" to view")
                //scopeComService.add("view");
                //scopeComService.add($scope.previousData);
                //$window.location.reload();
                //$location.path('/applications');
                $scope.applicationData=$scope.previousData;
                //console.log("applicationData: ", $scope.applicationData)
                $scope.mode="view";
                //populateDetails();
                //populateApplicationData();
              }
              $scope.previousValues=[];
            },0);
          }
        });
      }
    }
  }]);