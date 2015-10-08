app.directive('userinfo', [ 'localStorageService', 'usersService',  'scopeComService', '$location', '$timeout', 
    function (localStorageService, usersService,  scopeComService, $location, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'app/users/views/userInfoTemplate.html',
        scope: { 
            tableid: '@',          
            tabledata: '=',
            ready: '@'           
               },
        link: function ($scope) {          
            $scope.$watch('ready', function (newvalue, oldvalue) {
                if (newvalue=="true") {
                    $timeout(function () {                
                                       
                        var table = $('#' + $scope.tableid);                  
                        var oTable = table.dataTable(); 
                         
                        $scope.groups =[];
                        for (var i=0; i<$scope.tabledata.data.length; i++) 
                            $scope.groups[i] = {
                                "id":    $scope.tabledata.data[i][0].value,
                                "name":  $scope.tabledata.data[i][1].value
                            }                                          
                        
                        console.log("eeeeeeggggg0000ee",  $scope.groups ); 
                        
                        //get the data from the service
                        $scope.userData= scopeComService.list[0];
                        scopeComService.flush();
                        $scope.showIt = true;
                        $scope.groupz = []; 
                        $scope.groupzIDz =[];

                        if ($scope.userData=="add_new_user")
                             $scope.showIt = false;

                         if( $scope.showIt){
                            $scope._id= $scope.userData[0].value;
                            $scope.username = $scope.userData[1].value;
                            $scope.isDeleted= $scope.userData[2].value;
                            $scope.password = $scope.userData[3].value;  
                            //scope.groups must contain strings
                            for (var i=0; i<$scope.userData[4].length; i++)                           
                                 $scope.groupz[i] = {
                                    "id": $scope.userData[4][i].id,
                                    "name": $scope.userData[4][i].username
                                 }                                                                                  
                         }
                         else 
                            $scope.username = "";                  
                       
                        $scope.closeAlert = function() {
                                    $scope.alert=null;
                                    $scope.userData={
                                            "_id":'',
                                            "name":'',
                                            "password":'',                                            
                                            "groups": []                                           
                                        };                    
                                }    

                         $scope.userData= {
                                            "_id": $scope._id,
                                            "name": $scope.username,
                                            "password": $scope.password,                                           
                                            "groups": $scope.groupz
                                          }

                        
                         ///////////////////////////////////////////

                         $scope.add = function(){

                            for (var i=0; i< $scope.userData.groups.length; i++)
                                 $scope.groupzIDz[i] = $scope.userData.groups[i].id;
                             console.log("ggggggggggg",$scope.userData.groups );

                             $scope.userAddData= {                                            
                                            "username": $scope.userData.name,
                                            "password": $scope.userData.password,                                           
                                            "groups":  $scope.groupzIDz
                                          }

                                usersService.add($scope.userAddData, function (response) {
                                    console.log($scope.userAddData);
                                    console.log("User has been added successfully!");
                                                                        
                                    $location.path('/users');
                                },
                                 function (response) {
                                     console.log("errr->", $scope.userAddData);
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
                                                    msg: 'Wrong Group Ids or username already exists' 
                                               };
                                     }
                                 });            
                            };

                          
                         /////////////////////////////////////////////////////

                         $scope.update = function(){

                            for (var i=0; i< $scope.userData.groups.length; i++)
                                $scope.groupzIDz[i] = $scope.userData.groups[i].id;

                            $scope.updateData={
                                            "name":$scope.userData.username,
                                            "password":$scope.userData.password,
                                            "groups": $scope.groupzIDz                      
                                        }

                            usersService.update({ userId: $scope.userId }, $scope.updateData, function (response) {
                                    
                                    console.log("User has been updated successfully.");
                                    console.log("update data=>", $scope.updateData);
                                    $location.path('/users');
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
                    }, 0);
                }           
                
            });
        }
    }
}]);