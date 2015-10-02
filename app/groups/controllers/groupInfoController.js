
"use strict";

app.controller("groupInfoController", ['localStorageService','groupsService','$scope', 'scopeComService','$location',
   function (localStorageService, groupsService , $scope , scopeComService, $location ) {
    
	 $scope.groupData= scopeComService.list[0];
     scopeComService.flush();
     $scope.showIt = true;
     
    if ($scope.groupData=="add_new_group")
         $scope.showIt = false;

     if( $scope.showIt){
        $scope.groupId= $scope.groupData[0].value;
        $scope.description = $scope.groupData[1].value;
        $scope.isDeleted= $scope.groupData[2].value;       
     }
     else 
        $scope.groupId = "";

    $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.groupData={
                        "groupId":'',
                        "description":'',
                        "isDeleted":''                                              
                    };                    
            }    

     $scope.groupData={
                        "groupId": $scope.groupId,
                        "description": $scope.description,
                        "isDeleted":  $scope.isDeleted                      
                    }

     ///////////////////////////////////////////

     $scope.add = function(){

            $scope.groupAddData={
                        "groupId": $scope.groupId,
                        "description": $scope.groupData.description                                            
                    }

            groupsService.add($scope.groupAddData, function (response) {                
                console.log("group has been added successfully!");                
                $scope.groupAddData={
                        "groupId":'',
                        "description":''                                               
                    };    

                $location.path('/groups');
            },
             function (response) {
                 console.log($scope.groupData);
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
                        "groupId":$scope.groupData.groupId,
                        "description":$scope.groupData.description                       
                    }

        groupsService.update({ groupId: $scope.groupId }, $scope.updateData, function (response) {
                
                console.log("group has been updated successfully.");
                console.log("update data=>", $scope.updateData);
                $location.path('/groups');
            },
             function (response) {
                 console.log("err update -->", $scope.groupData);
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

