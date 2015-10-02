app.directive('myTable', ['$timeout', '$log', '$location', 'scopeComService', 'usersService', 'groupsService', 'userPermissionService', '$window',
  function ($timeout, $log, $location, scopeComService, usersService, groupsService, userPermissionService, $window) {
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

                        //add user btn
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
                        }
                                             
                          //click edit btns  /////////////////////////////////////////////////////                                                            
                          $scope.edit_entity= function(editline) {                          
                                                          
                              //write data to registered service scopeCommService     
                              scopeComService.add($scope.tabledata.data[editline]);
                              
                              if ($location.path() == '/users')
                                 $location.path('/userInfo');
                              if ($location.path() == '/groups')
                                 $location.path('/groupInfo'); 
                             
                             // $scope.$apply();
                          }
                                              
                         // click delete btns//////////////////////////////////////////////////////////
                          $scope.delete_entity= function(editline) {
                                                         
                            var entityName, _id, entity="";

                            if($location.path()=="/users")
                            {
                                entity = "user";
                                _id = $scope.tabledata.data[editline][0].value;
                                entityName = $scope.tabledata.data[editline][1].value;

                            }
                            if($location.path()=="/groups")                                
                                 {
                                    entity = "group";
                                    _id = $scope.tabledata.data[editline][0].value;
                                    entityName = _id;
                                 }  
                            
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
                                           console.log($scope.userData);
                                           if (response.data == null){
                                               console.log("response  data is null! -(0)");                                          
                                           }
                                           else{
                                             console.log("response (0) ->", response);                                      
                                           }
                                      });                                                     
                                }//end if entity == group

                                else if (entity=="group"){                                                                            
                                      groupsService.remove({ groupId: _id }, function (response) {                   
                                        console.log("Group has been deleted successfully."); 
                                        //refresh page
                                        $window.location.reload();                                   
                                        },
                                        function (response) {
                                           console.log($scope.groupData);
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