
"use strict";

app.controller("permissionInfoController", ['localStorageService','permissionsService','$scope', 'scopeComService','$location',
   function (localStorageService, permissionsService , $scope , scopeComService, $location ) {
    
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
                console.log("permission has been added successfully!");                
                
                $location.path('/permissions');
            },
             function (response) {
                 console.log("err-perm->", $scope.permissionAddData);
                 if (response.data == null)
                 {
                     console.log("response data is null!!!!!");
                      $scope.alert = { 
                                type: 'danger', 
                                msg: 'No response from server' 
                           };
                 }
                 else
                 {
                   console.log("response ->", response);
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
                
                console.log("permission has been updated successfully.");
                console.log("update data=>", $scope.updateData);
                $location.path('/permissions');
            },
             function (response) {
                 console.log("err update -->", $scope.updateData);
                 if (response.data == null)
                 {
                     console.log("response data is null!!!!!");
                      $scope.alert = { 
                                type: 'danger', 
                                msg: 'No response from server' 
                           };
                 }
                 else
                 {
                   console.log("response ->", response);
                   $scope.alert = { 
                                type: 'danger', 
                                msg: 'Wrong input data' 
                           };
                 }
             });        
     }

     ////////////////////////////////


     
}]);

