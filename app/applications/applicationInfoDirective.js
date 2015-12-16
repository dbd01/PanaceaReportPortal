"use strict";
app.directive('applicationinfo', [ 'localStorageService','consoleService' , 'applicationsService',  'scopeComService', '$location', '$timeout',
  function (localStorageService, consoleService, applicationsService,  scopeComService, $location, $timeout) {
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
              var oTable = table.dataTable();
              $scope.groups =[];
              for (var i=0; i<$scope.tabledata.data.length; i++){
                $scope.groups[i] = {
                  "users": $scope.tabledata.data[i].users,
                  "permissions": $scope.tabledata.data[i].permissions,
                  "id": $scope.tabledata.data[i]._id,
                  "name": $scope.tabledata.data[i].name
                }
              }
              $scope.mode = scopeComService.list[0];
              if ($scope.mode=="edit"){
                $scope.applicationData= scopeComService.list[1];
                $scope.previousData=scopeComService.list[1];
              }
              else  if ($scope.mode=="view"){
                $scope.applicationData= scopeComService.list[1];
                $scope.previousData=scopeComService.list[1];
                if (scopeComService.list.length==3)
                  $scope.deletedData=true;
                else
                  $scope.deletedData=false;
              }
              else {
                $scope.previousData=null;
                $scope.applicationData=null;
              }
              scopeComService.flush();
              $scope.groupz = [];
              $scope.groupzIDz =[]; 
              
              console.log("mode: ", $scope.mode);
              if($scope.mode=="view" || $scope.mode=="edit"){
                //populateDetails();
              }
              else{
                $scope.name = "";
              }
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
                  $scope.groupzIDz[i] = $scope.applicationData.groups[i].id; 
                }
                $scope.applicationAddData={
                  "name":$scope.applicationData.name,
                  "description": $scope.applicationData.description,
                  "url": $scope.applicationData.url,
                  "groups": $scope.groupzIDz
                }
                applicationsService.add($scope.applicationAddData, function (response) {
                  consoleService.printIt("app data->", $scope.applicationData);
                  consoleService.printIt("Application has been added successfully!", response.uri);                                                                       
                  $location.path('/applications');
                },function (response) {
                  consoleService.printIt($scope.applicationAddData);
                  if (response.data == null){
                    consoleService.printIt("response data is null!!!!!");
                    $scope.alert = { 
                      type: 'danger',
                      msg: 'No response from server'
                    };
                  }
                  else{
                    consoleService.printIt("response ->", response);
                    $scope.alert = {
                      type: 'danger', 
                      msg: response.data.message 
                    };
                  }
                });
              };
              $scope.update = function(){
                for (var i=0; i< $scope.applicationData.groups.length; i++){
                  $scope.groupzIDz[i] = $scope.applicationData.groups[i].id; 
                }
                $scope.updateData={
                  "name":$scope.applicationData.name,
                  "description": $scope.applicationData.description,
                  "url": $scope.applicationData.url,
                  "groups": $scope.groupzIDz
                }
                applicationsService.update({ applicationId: $scope._id }, $scope.updateData, function (response) {
                  consoleService.printIt("Application has been updated successfully.");
                  consoleService.printIt("update data=>", $scope.updateData);
                  $location.path('/applications');
                },function (response) {
                  consoleService.printIt("err update -->", $scope.updateData);
                  if (response.data == null){
                    consoleService.printIt("response data is null!!!!!");
                    $scope.alert = {
                      type: 'danger',
                      msg: 'No response from server'
                    };
                  }
                  else{
                    consoleService.printIt("response ->", response);
                    $scope.alert = {
                      type: 'danger',
                      msg: response.data.message
                    };
                  }
                });
              }
              $scope.edit = function(){
                console.log("mode from : "+$scope.mode+" to edit")
                console.log("previousData3: ", $scope.previousData)
                $scope.mode="edit";
              }
              $scope.cancelEdit = function(){
                if ($scope.deletedData){
                  $location.path('/applications/deleted');
                }
                else{
                  $location.path('/applications/all');
                }
              }
              $scope.cancelAdd = function(){
                $location.path('/applications');
              }
              $scope.cancelUpdate = function(){
                console.log("previousData2: ", $scope.previousData)
                console.log("applicationData: ", $scope.applicationData)
                console.log("mode from : "+$scope.mode+" to view")
                //scopeComService.add("view");
                //scopeComService.add($scope.previousData);
                //$window.location.reload();
                //$location.path('/applications');
                $scope.applicationData=$scope.previousData;
                console.log("applicationData: ", $scope.applicationData)
                $scope.mode="view";
                populateDetails();
                populateApplicationData();
              }
              $scope.previousValues=[];
            },0);
          }
        });
      }
    }
  }]);