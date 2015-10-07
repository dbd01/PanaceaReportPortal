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
                            $scope.groups[i] = $scope.tabledata.data[i][0].value;
                        
                        console.log("eeeeeeggggg0000ee",  $scope.groups ); 
                        
                        //get the data from the service
                        $scope.applicationData= scopeComService.list[0];
                        scopeComService.flush();
                        $scope.showIt = true;
                        $scope.groupz = []; 

                        if ($scope.applicationData=="add_new_application")
                             $scope.showIt = false;

                         if( $scope.showIt){
                            $scope.applicationId= $scope.applicationData[0].value;
                            $scope.name = $scope.applicationData[1].value;
                            $scope.description= $scope.applicationData[2].value;
                            $scope.protocol = $scope.applicationData[3].value; 
                            $scope.link = $scope.applicationData[4].value;
                            $scope.port = $scope.applicationData[5].value;
                            $scope.hostname = $scope.applicationData[6].value;

                            //scope.groups must contain strings
                            for (var i=0; i<$scope.applicationData[7].length; i++)
                                 $scope.groupz[i] = $scope.applicationData[7][i].groupId;                       
                         }
                         else 
                            $scope.name = "";                  
                       
                        $scope.closeAlert = function() {
                                    $scope.alert=null;
                                    $scope.applicationData={
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

                                applicationsService.add($scope.applicationData, function (response) {
                                    console.log("app data->", $scope.applicationData);
                                    console.log("Application has been added successfully!");
                                    
                                    $scope.applicationData={
                                            "name":'',
                                            "description":'',
                                            "protocol": '',
                                            "link":"",
                                            "port":'',
                                            "hostname": '',
                                            "groups": []
                                        };       

                                    $location.path('/applications');
                                },
                                 function (response) {
                                     console.log($scope.applicationData);
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

                            $scope.updateData={
                                            "name":$scope.name,
                                            "description": $scope.description,
                                            "protocol": $scope.protocol,
                                            "link": $scope.link,
                                            "port": $scope.port,
                                            "hostname": $scope.hostname,
                                            "groups": $scope.groupz                   
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