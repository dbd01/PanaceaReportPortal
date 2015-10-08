app.directive('myTable', ['$timeout', '$log', '$location', 'scopeComService', 'usersService', 'applicationsService', 'groupsService', 'permissionsService', '$window',
  function ($timeout, $log, $location, scopeComService, usersService, applicationsService, groupsService, permissionsService, $window) {
    return {
        restrict: 'E',
        templateUrl: 'app/layout/views/tableTemplate.html',
        scope: {
            tableid: '@',
            tabletitle: '@',
            tabledata: '=',
            ready: '@',
            tableresult: '=',                   
            tableeditable: '=' // it was '@' but didn't work with the views
        },
        link: function ($scope, element, attrs) {
            $scope.$watch('ready', function (newvalue, oldvalue) {
                if (newvalue=="true") {
                    $timeout(function () {
                        if ($scope.tableeditable == "true") 
                            $scope.toolbar_width = "col-md-6";
                        else
                            $scope.toolbar_width = "col-md-12";

                        var table = $('#' + $scope.tableid);                  
                        var oTable = table.dataTable(); 

                        //add user btn////////////////////////////////////////////////
                        $scope.addNewEntity = function(){
                            if($location.path()=="/users"){
                                scopeComService.add("add_new_user");                           
                                $location.path('/userInfo');
                                //$scope.$apply();                             
                            }
                            if($location.path()=="/groups"){
                                scopeComService.add("add_new_group");                           
                                $location.path('/groupInfo');
                                //$scope.$apply();                             
                            }
                            if($location.path()=="/applications"){
                                scopeComService.add("add_new_application");                           
                                $location.path('/applicationInfo');
                                //$scope.$apply();                             
                            }
                            if($location.path()=="/permissions"){
                                scopeComService.add("add_new_permission");                           
                                $location.path('/permissionInfo');
                                //$scope.$apply();                             
                            }

                        }
                                             
                          //click edit btns  /////////////////////////////////////////////////////                                                            
                          $scope.edit_entity= function(editline) {  

                           //query for one entity                        
                            if ($location.path() == '/users')
                            {
                                usersService.viewUser({ userId: $scope.tabledata.data[editline][0].value}).$promise
                                .then(
                                  function (user) {
                                    console.log("userrr:=>",user);                           
                                    $scope.tabledata.data[editline].push(user.groups);                                                 
                                })    
                                .then(function () {
                                   //write data to registered service scopeCommService     
                                   scopeComService.add($scope.tabledata.data[editline]); 
                                   $location.path('/userInfo');                              
                                    
                                });
                            } ///end if location.path=users    

                              if ($location.path() == '/applications')
                              {
                                applicationsService.viewApp({ applicationId: $scope.tabledata.data[editline][0].value}).$promise
                                .then(
                                  function (application) {
                                    console.log("applicationnn:=>",application);                           
                                    $scope.tabledata.data[editline].push(application.groups);                                                 
                                })    
                                .then(function () {
                                   //write data to registered service scopeCommService     
                                   scopeComService.add($scope.tabledata.data[editline]); 
                                   $location.path('/applicationInfo');                              
                                    
                                });
                              } ///end if location.path=applications                                                       
                             
                                 
                              if ($location.path() == '/groups')
                              {                                       
                                 scopeComService.add($scope.tabledata.data[editline]);
                                 $location.path('/groupInfo'); 
                              }

                              if ($location.path() == '/permissions')
                              {                                       
                                 scopeComService.add($scope.tabledata.data[editline]);
                                 $location.path('/permissionInfo'); 
                              }

                             
                             // $scope.$apply();
                          }
                                              
                         // click delete btns//////////////////////////////////////////////////////////
                          $scope.delete_entity= function(editline) {
                                                         
                            var entityName, _id, entity="";
                            _id = $scope.tabledata.data[editline][0].value;
                            entityName = $scope.tabledata.data[editline][1].value;

                            if($location.path()=="/users")                            
                                entity = "user";                                
                            
                            if($location.path()=="/groups")                             
                                entity = "group";

                            if($location.path()=="/permissions")                             
                                entity = "permission";  
                                
                             if($location.path()=="/applications")                          
                                entity = "application";                              
                                                     
                            bootbox.confirm("Are you sure you want to delete " + entity + " <b>" + entityName +"</b> ?", function(ok) {
                               if (ok){
                                  //delete entity 
                                  if (entity=="user"){                                                                            
                                      usersService.remove({ userId: _id }, function (response) {                   
                                        console.log("User has been deleted successfully."); 
                                        //refresh page
                                        $window.location.reload();                                   
                                        },
                                        function (response) {                                           
                                           if (response.data == null){
                                               console.log("response  data is null! -(0)");                                          
                                           }
                                           else{
                                             console.log("response (0) ->", response);                                      
                                           }
                                      });                                                     
                                }//end if entity == user

                                if (entity=="application"){                                                                            
                                      applicationsService.remove({ applicationId: _id }, function (response) {                   
                                        console.log("Application has been deleted successfully."); 
                                        //refresh page
                                        $window.location.reload();                                   
                                        },
                                        function (response) {                                          
                                           if (response.data == null){
                                               console.log("response  data is null! -(0)");                                          
                                           }
                                           else{
                                             console.log("response (0) ->", response);                                      
                                           }
                                      });                                                     
                                }//end if entity == application

                                else if (entity=="group"){                                                                            
                                      groupsService.remove({ groupId: _id }, function (response) {                   
                                        console.log("Group has been deleted successfully."); 
                                        //refresh page
                                        $window.location.reload();                                   
                                        },
                                        function (response) {                                          
                                           if (response.data == null){
                                               console.log("response  data is null! -(0)");                                          
                                           }
                                           else{
                                             console.log("response (0) ->", response);                                      
                                           }
                                      });                                                     
                                }//end if entity == group

                                else if (entity=="permission"){                                                                            
                                      permissionsService.remove({ permissionId: _id }, function (response) {                   
                                        console.log("Permission has been deleted successfully."); 
                                        //refresh page
                                        $window.location.reload();                                   
                                        },
                                        function (response) {                                          
                                           if (response.data == null){
                                               console.log("response  data is null! -(0)");                                          
                                           }
                                           else{
                                             console.log("response (0) ->", response);                                      
                                           }
                                      });                                                     
                                }//end if entity == group


                               } //end if ok
                            }); 
                               
                          }
                          //////////////////////                  
                      
                    }, 0);
                }
            })
        }
    }
}]);