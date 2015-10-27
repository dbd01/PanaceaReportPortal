
"use strict";

app.controller("permissionInfoController", ['localStorageService', 'consoleService','permissionsService','$scope', 'scopeComService','$location',
   function (localStorageService, consoleService, permissionsService , $scope , scopeComService, $location ) {
    
	 $scope.permissionData= scopeComService.list[0];
     scopeComService.flush();
     $scope.showIt = true;
     
    if ($scope.permissionData=="add_new_permission")
         $scope.showIt = false;

     if($scope.showIt){
        $scope._id= $scope.permissionData[0].value;
        $scope.name= $scope.permissionData[1].value;
        $scope.type = $scope.permissionData[2].value;
        $scope.url= $scope.permissionData[3].value;
        $scope.isDeleted= $scope.permissionData[4].value; 
     }
     else 
        $scope._id = "";

    $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.permissionData={
                        "_id":'',
                        "name":'',
                        "type":'',
                        "url":'',
                        "isDeleted":''                                              
                    };                    
            }    

     $scope.permissionData={ 
                        "_id": $scope._id,
                        "name": $scope.name,
                        "type": $scope.type,
                        "url": $scope.url,
                        "isDeleted":  $scope.isDeleted                      
                    }

     ///////////////////////////////////////////

     $scope.add = function(){

            $scope.permissionAddData={
                        "name": $scope.permissionData.name,
                        "type": $scope.permissionData.type,
                        "url": $scope.permissionData.url                                           
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
                                msg: 'Wrong Group Id or groupname already exists' 
                           };
                 }
             });            
        };

      
     ////////////////////////////////////////////////////

     $scope.update = function(){

        $scope.updateData={
                       "name": $scope.permissionData.name,
                        "type": $scope.permissionData.type,
                        "url": $scope.permissionData.url                       
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

