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
                    $timeout(function () {                
                                       
                        var table = $('#' + $scope.tableid);                  
                        var oTable = table.dataTable(); 
                         
                        $scope.groups =[];
                        for (var i=0; i<$scope.tabledata.data.length; i++) 
                            $scope.groups[i] = {
                                "id":    $scope.tabledata.data[i][0].value,
                                "name":  $scope.tabledata.data[i][1].value
                            }      
                        
                        consoleService.printIt("eeeeeeggggg0000ee",  $scope.groups ); 
                        
                        //get the data from the service
                        $scope.applicationData= scopeComService.list[0];
                        scopeComService.flush();
                        $scope.showIt = true;
                        $scope.groupz = [];
                        $scope.groupzIDz =[]; 

                        if ($scope.applicationData=="add_new_application")
                             $scope.showIt = false;

                         if( $scope.showIt){
                            $scope._id= $scope.applicationData[0].value;
                            $scope.name = $scope.applicationData[1].value;
                            $scope.description= $scope.applicationData[2].value;
                            
                            //scope.groups must contain strings
                            for (var i=0; i<$scope.applicationData[3].length; i++)
                                 $scope.groupz[i] = {
                                                        "id": $scope.applicationData[3][i]._id,
                                                        "name": $scope.applicationData[3][i].name
                                                    }                           
                         }
                         else 
                            $scope.name = "";                  
                       
                        $scope.closeAlert = function() {
                                    $scope.alert=null;
                                    $scope.applicationData={
                                            "_id":'',
                                            "name":'',
                                            "description":'',
                                            "groups": []
                                        };                    
                                }    

                         $scope.applicationData={
                                            "_id": $scope._id,
                                            "name":$scope.name,
                                            "description": $scope.description,
                                            "groups": $scope.groupz
                                        }

                       
                         ///////////////////////////////////////////

                         $scope.add = function(){

                              for (var i=0; i< $scope.applicationData.groups.length; i++)
                                 $scope.groupzIDz[i] = $scope.applicationData.groups[i].id; 

                                 $scope.applicationAddData={
                                            "name":$scope.applicationData.name,
                                            "description": $scope.applicationData.description,
                                            "groups": $scope.groupzIDz
                                        }

                            applicationsService.add($scope.applicationAddData, function (response) {
                                    consoleService.printIt("app data->", $scope.applicationData);
                                    consoleService.printIt("Application has been added successfully!");                                                                       
                                    $location.path('/applications');
                                },
                                 function (response) {
                                     consoleService.printIt($scope.applicationAddData);
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
                                                    msg: 'Wrong Group Id or username already exists' 
                                               };
                                     }
                                 });            
                            };

                          
                         /////////////////////////////////////////////////////

                         $scope.update = function(){
                             
                            for (var i=0; i< $scope.applicationData.groups.length; i++)
                                 $scope.groupzIDz[i] = $scope.applicationData.groups[i].id; 

                            $scope.updateData={
                                            "name":$scope.applicationData.name,
                                            "description": $scope.applicationData.description,
                                            "groups": $scope.groupzIDz                  
                                        }

                            applicationsService.update({ applicationId: $scope._id }, $scope.updateData, function (response) {
                                    
                                    consoleService.printIt("Application has been updated successfully.");
                                    consoleService.printIt("update data=>", $scope.updateData);
                                    $location.path('/applications');
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