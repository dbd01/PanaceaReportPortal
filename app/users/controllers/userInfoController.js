
"use strict";

app.controller("userInfoController", ['localStorageService','usersService','$scope', 'scopeComService','$location',
   function (localStorageService, usersService , $scope , scopeComService, $location ) {
    
	 $scope.userData= scopeComService.list[0];
     scopeComService.flush();
     $scope.showIt = true;
     
    if ($scope.userData=="add_new_user")
         $scope.showIt = false;

     if( $scope.showIt){
        $scope.userId= $scope.userData[0].value;
        $scope.username = $scope.userData[1].value;
        $scope.isDeleted= $scope.userData[2].value;
        $scope.password = $scope.userData[3].value;
     }
     else 
        $scope.username = "";

    $scope.closeAlert = function() {
                $scope.alert=null;
                $scope.userData={
                        "username":'',
                        "password":'',
                        "applicationId":"polyphemus",
                        "groupId":''
                    };                    
            }    

     $scope.userData={
                        "username": $scope.username,
                        "password": $scope.password,
                        "applicationId":"polyphemus",
                        "groupId":''
                    }

     ///////////////////////////////////////////

     $scope.add = function(){

            usersService.add($scope.userData, function (response) {
                console.log($scope.userData);
                console.log("User has been added successfully!");
                
                $scope.userData={
                        "username":'',
                        "password":"",
                        "applicationId":"",                        
                        "groupId":""
                    }; 

                $location.path('/users');
            },
             function (response) {
                 console.log($scope.userData);
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
                                msg: 'Wrong Group Id or username already exists' 
                           };
                 }
             });            
        };

      
     ////////////////////////////////////////////////////

     $scope.update = function(){

        $scope.updateData={
                        "username":$scope.userData.username,
                        "password":$scope.userData.password                       
                    }

        usersService.update({ userId: $scope.userId }, $scope.updateData, function (response) {
                
                console.log("User has been updated successfully.");
                console.log("update data=>", $scope.updateData);
                $location.path('/users');
            },
             function (response) {
                 console.log("err update -->", $scope.userData);
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

