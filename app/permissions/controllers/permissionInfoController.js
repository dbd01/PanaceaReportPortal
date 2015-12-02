
"use strict";

app.controller("permissionInfoController", ['localStorageService', 'consoleService','permissionsService','$scope', 'scopeComService','$location',
   function (localStorageService, consoleService, permissionsService , $scope , scopeComService, $location ) {
    
	 $scope.permissionData= scopeComService.list[0];
     
     $scope.showIt = true;
     $scope.createPermission=false;
     
     if ($scope.permissionData=="add_requested_permission"){
        $scope.showIt = false;
        $scope.createPermission=true;
        $scope.permissionData=scopeComService.list[1];
    }

    if ($scope.permissionData=="add_new_permission")
        $scope.showIt = false;

    if ($scope.createPermission){
        $scope.name= $scope.permissionData[1].value;
    }
    else if($scope.showIt){
        $scope._id= $scope.permissionData[0].value;
        $scope.name= $scope.permissionData[1].value;
        $scope.type = $scope.permissionData[2].value;
        $scope.url= $scope.permissionData[3].value; 
        $scope.description= $scope.permissionData[4].value;
        $scope.model= $scope.permissionData[5].value;       
     }
     else 
        $scope._id = "";

    scopeComService.flush();

    $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.permissionData={
                        "_id":'',
                        "name":'',
                        "type":'',
                        "url":'',
                        "description": '',
                        "model": ''                                                                   
                    };                    
            }    

     $scope.permissionData={ 
                        "_id": $scope._id,
                        "name": $scope.name,
                        "type": $scope.type,
                        "url": $scope.url,
                        "description": $scope.description,
                        "model": $scope.model                                           
                    }

     ///////////////////////////////////////////

     $scope.add = function(){

            $scope.permissionAddData={
                        "name": $scope.permissionData.name,
                        "type": $scope.permissionData.type,
                        "url": $scope.permissionData.url,
                        "description": $scope.permissionData.description,
                        "model": $scope.permissionData.model                                          
                    }

            permissionsService.add($scope.permissionAddData, function (response) {                
                consoleService.printIt("permission has been added successfully!");                
                
                $location.path('/permissions');
            },
             function (response) {
                 consoleService.printIt("err-perm->", $scope.permissionAddData);
                 if (response.data == null)
                 {
                     consoleService.printIt("response data is null!!!!!");
                      $scope.alert = { 
                                type: 'danger', 
                                msg: 'No response from server' 
                           };
                 }
                 else
                 {
                   consoleService.printIt("response ->", response);
                   $scope.alert = { 
                                type: 'danger', 
                                msg: 'Wrong permission data or permission already exists' 
                           };
                 }
             });            
        };

      
     ////////////////////////////////////////////////////

     $scope.update = function(){

        $scope.updateData={
                       "name": $scope.permissionData.name,
                        "type": $scope.permissionData.type,
                        "url": $scope.permissionData.url ,
                        "description": $scope.permissionData.description,
                        "model": $scope.permissionData.model                      
                    }

        permissionsService.update({ permissionId: $scope._id }, $scope.updateData, function (response) {
                
                consoleService.printIt("permission has been updated successfully.");
                consoleService.printIt("update data=>", $scope.updateData);
                $location.path('/permissions');
            },
             function (response) {
                 consoleService.printIt("err update -->", $scope.updateData);
                 if (response.data == null)
                 {
                     consoleService.printIt("response data is null!!!!!");
                      $scope.alert = { 
                                type: 'danger', 
                                msg: 'No response from server' 
                           };
                 }
                 else
                 {
                   consoleService.printIt("response ->", response);
                   $scope.alert = { 
                                type: 'danger', 
                                msg: 'Wrong input data' 
                           };
                 }
             });        
     }

     ////////////////////////////////


     
}]);

