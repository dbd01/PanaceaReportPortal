app.directive('groupinfo', [ 'localStorageService', 'consoleService', 'groupsService',  'scopeComService', '$location', '$timeout', 
    function (localStorageService, consoleService, groupsService,  scopeComService, $location, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'app/groups/views/groupInfoTemplate.html',
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
                         
                        $scope.permissions =[];
                        for (var i=0; i<$scope.tabledata.data.length; i++) 
                            $scope.permissions[i] = {
                                "id":    $scope.tabledata.data[i][0].value,
                                "name":  $scope.tabledata.data[i][1].value
                            }                                          
                        
                        consoleService.printIt("perrrrrrrr",  $scope.permissions ); 
                        
                        //get the data from the service
                         $scope.groupData= scopeComService.list[0];
                         scopeComService.flush();
                         $scope.showIt = true;
                         $scope.permissionz = []; 
                         $scope.permissionzIDz =[];
                         
                        if ($scope.groupData=="add_new_group")
                             $scope.showIt = false;

                         if( $scope.showIt){
                            $scope._id= $scope.groupData[0].value;
                            $scope.name= $scope.groupData[1].value;
                            $scope.description = $scope.groupData[2].value;
                            $scope.isDeleted= $scope.groupData[3].value;
                            //scope.permissions must contain strings
                            for (var i=0; i<$scope.groupData[4].length; i++)                           
                                 $scope.permissionz[i] = {
                                                        "id": $scope.groupData[4][i]._id,
                                                        "name": $scope.groupData[4][i].name
                                                    }           
                         }
                         else 
                            $scope.groupId = "";

                        $scope.closeAlert = function() {
                                    $scope.alert=null;
                                    $scope.groupData={
                                            "_id":'',
                                            "name":'',
                                            "description":'',
                                            "isDeleted":'',
                                            "permissions": []                                              
                                        };                    
                                }    

                         $scope.groupData={ 
                                            "_id": $scope._id,
                                            "name": $scope.name,
                                            "description": $scope.description,
                                            "isDeleted":  $scope.isDeleted,
                                            "permissions": $scope.permissionz                      
                                        }

                         ///////////////////////////////////////////

                         $scope.add = function(){

                            for (var i=0; i< $scope.groupData.permissions.length; i++)
                                 $scope.permissionzIDz[i] = $scope.groupData.permissions[i].id;

                                $scope.groupAddData={
                                            "name": $scope.groupData.name,
                                            "description": $scope.groupData.description ,
                                            "permissions":  $scope.permissionzIDz                                           
                                        }

                                groupsService.add($scope.groupAddData, function (response) {                
                                    consoleService.printIt("group has been added successfully!");                
                                    
                                    $location.path('/groups');
                                },
                                 function (response) {
                                     consoleService.printIt($scope.groupAddData);
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

                            for (var i=0; i< $scope.groupData.permissions.length; i++)
                                 $scope.permissionzIDz[i] = $scope.groupData.permissions[i].id;

                            $scope.updateData={
                                            "name":$scope.groupData.name,
                                            "description":$scope.groupData.description,
                                            "permissions":  $scope.permissionzIDz                      
                                        }

                            groupsService.update({ groupId: $scope._id }, $scope.updateData, function (response) {
                                    
                                    consoleService.printIt("group has been updated successfully.");
                                    consoleService.printIt("update data=>", $scope.updateData);
                                    $location.path('/groups');
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


                    }, 0);
                }           
                
            });
        }
    }
}]);