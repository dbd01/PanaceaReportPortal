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
                  "id": $scope.tabledata.data[i][0].value,
                  "name": $scope.tabledata.data[i][1].value
                }
              }
              consoleService.printIt("eeeeeeggggg0000ee",  $scope.groups );
              //get the data from the service
              $scope.mode = scopeComService.list[0];
              console.log("mode: ", $scope.mode);
              if ($scope.mode=="view"){
                $scope.applicationData= scopeComService.list[1];
                $scope.view=true;
                $scope.edit = false;
                $scope.add=false;
              }
              else if ($scope.mode=="edit"){
                $scope.applicationData= scopeComService.list[1];
                $scope.view=false;
                $scope.edit = true;
                $scope.add=false;
              }
              else if ($scope.mode=="add"){
                $scope.view=false;
                $scope.edit = false;
                $scope.add=true;
              }
              console.log("view: ", $scope.view);
              console.log("edit: ", $scope.edit);
              console.log("add: ", $scope.add);
              scopeComService.flush();
              $scope.groupz = [];
              $scope.groupzIDz =[]; 
              
              if($scope.view){
                console.log("view: ", $scope.applicationData[4])
                $scope._id= $scope.applicationData[0].value;
                $scope.name = $scope.applicationData[1].value;
                $scope.description= $scope.applicationData[2].value;
                $scope.url= $scope.applicationData[3].value;
                //scope.groups must contain strings
                for (var i=0; i<$scope.applicationData[4].length; i++){
                  $scope.groupz[i] = {
                    "id": $scope.applicationData[4][i]._id,
                    "name": $scope.applicationData[4][i].name,
                    "description": $scope.applicationData[4][i].description,
                    "permissions": []
                  }
                  for (var j=0; j<$scope.applicationData[4][i].permissions.length; j++){
                    $scope.groupz[i].permissionz[j] = {
                      "id": $scope.applicationData[4][i]._id,
                      "name": $scope.applicationData[4][i].name,
                      "description": $scope.applicationData[4][i].description
                    }
                  }
                }
              }
              else if($scope.edit){
                console.log("edit: ", $scope.applicationData[4])
                $scope._id= $scope.applicationData[0].value;
                $scope.name = $scope.applicationData[1].value;
                $scope.description= $scope.applicationData[2].value;
                $scope.url= $scope.applicationData[3].value;
                //scope.groups must contain strings
                for (var i=0; i<$scope.applicationData[4].length; i++){
                  $scope.groupz[i] = {
                    "id": $scope.applicationData[4][i]._id,
                    "name": $scope.applicationData[4][i].name
                  }
                }
              }
              else
                $scope.name = "";

              $scope.applicationData={
                "_id": $scope._id,
                "name":$scope.name,
                "description": $scope.description,
                "url": $scope.url,
                "groups": $scope.groupz
              }
              console.log("mode: ",$scope.mode, $scope.applicationData)
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
            },0);
          }
        });
      }
    }
  }]);