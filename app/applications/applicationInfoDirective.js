app.directive('applicationinfo', [ 'localStorageService', 'applicationsService',  'scopeComService', '$location', '$timeout', 
    function (localStorageService, applicationsService,  scopeComService, $location, $timeout) {
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
                        
                        console.log("eeeeeeggggg0000ee",  $scope.groups ); 
                        
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
                            $scope.protocol = $scope.applicationData[3].value; 
                            $scope.link = $scope.applicationData[4].value;
                            $scope.port = $scope.applicationData[5].value;
                            $scope.hostname = $scope.applicationData[6].value;

                            //scope.groups must contain strings
                            for (var i=0; i<$scope.applicationData[7].length; i++)
                                 $scope.groupz[i] = {
                                                        "id": $scope.applicationData[7][i]._id,
                                                        "name": $scope.applicationData[7][i].name
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
                                            "protocol": '',
                                            "link":"",
                                            "port":'',
                                            "hostname": '',
                                            "groups": []
                                        };                    
                                }    

                         $scope.applicationData={
                                            "_id": $scope._id,
                                            "name":$scope.name,
                                            "description": $scope.description,
                                            "protocol": $scope.protocol,
                                            "link": $scope.link,
                                            "port": $scope.port,
                                            "hostname": $scope.hostname,
                                            "groups": $scope.groupz
                                        }

                       
                         ///////////////////////////////////////////

                         $scope.add = function(){

                              for (var i=0; i< $scope.applicationData.groups.length; i++)
                                 $scope.groupzIDz[i] = $scope.applicationData.groups[i].id; 

                                 $scope.applicationAddData={
                                            "name":$scope.applicationData.name,
                                            "description": $scope.applicationData.description,
                                            "protocol": $scope.applicationData.protocol,
                                            "link": $scope.applicationData.link,
                                            "port": $scope.applicationData.port,
                                            "hostname": $scope.applicationData.hostname,
                                            "groups": $scope.groupzIDz
                                        }

                            applicationsService.add($scope.applicationAddData, function (response) {
                                    console.log("app data->", $scope.applicationData);
                                    console.log("Application has been added successfully!");                                                                       
                                    $location.path('/applications');
                                },
                                 function (response) {
                                     console.log($scope.applicationAddData);
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

                          
                         /////////////////////////////////////////////////////

                         $scope.update = function(){
                             
                            for (var i=0; i< $scope.applicationData.groups.length; i++)
                                 $scope.groupzIDz[i] = $scope.applicationData.groups[i].id; 

                            $scope.updateData={
                                            "name":$scope.applicationData.name,
                                            "description": $scope.applicationData.description,
                                            "protocol": $scope.applicationData.protocol,
                                            "link": $scope.applicationData.link,
                                            "port": $scope.applicationData.port,
                                            "hostname": $scope.applicationData.hostname,
                                            "groups": $scope.groupzIDz                  
                                        }

                            applicationsService.update({ applicationId: $scope.applicationId }, $scope.updateData, function (response) {
                                    
                                    console.log("Application has been updated successfully.");
                                    console.log("update data=>", $scope.updateData);
                                    $location.path('/applications');
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