
"use strict";

app.controller("userInfoController", ['localStorageService','usersService','$scope', 'scopeComService','$location',
   function (localStorageService, usersService , $scope , scopeComService, $location ) {
    
	 $scope.userData= scopeComService.list[0];
     scopeComService.flush();
    
     $scope.userData={
                        "username":$scope.userData[1].value,
                        "password":'',
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
                 }
                 else
                 {
                   console.log("response ->", response);
                 }
             });            
        };

       ////////////////////////////////////////////////     

     $scope.delete = function(){

        
     } 

     $scope.update = function(){

        
     } 
     $scope.partialUpdate = function(){

        
     } 

}]);

