app.directive('myTable', ['$timeout', '$log', '$location', 'scopeComService', 'consoleService', 'usersService', 'applicationsService', 'groupsService', 'permissionsService', 'requestedPermissionsService', '$window',
  function ($timeout, $log, $location, scopeComService, consoleService, usersService, applicationsService, groupsService, permissionsService, requestedPermissionsService, $window) {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/views/tableTemplate.html',
      scope: {
        tableid: '@',
        tabletitle: '@',
        tabledata: '=',
        ready: '@',
        tableresult: '=',
        tableeditable: '=', // it was '@' but didn't work with the views
        tablerequestedperm: '=' // it was '@' but didn't work with the views
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
                    scopeComService.add("add");
                    $location.path('/applicationInfo');
                    //$scope.$apply();                             
                }
                if($location.path()=="/permissions"){
                    scopeComService.add("add_new_permission");
                    $location.path('/permissionInfo');
                    //$scope.$apply();                             
                }
              }
              $scope.view_entity= function(editline){
                //query for one entity                        
                if ($location.path() == '/users'){
                  usersService.viewUser({ userId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (user) {
                    consoleService.printIt("userrr:=>",user);
                    $scope.tabledata.data[editline].push(user.groups);
                  }).then(function () {
                    //write data to registered service scopeCommService     
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/userInfo');
                  });
                } ///end if location.path=users    

                if ($location.path() == '/applications'){
                  applicationsService.viewApp({ applicationId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (application) {
                    consoleService.printIt("applicationnn:=>",application);
                    $scope.tabledata.data[editline].push(application.groups);
                  }).then(function () {
                    //write data to registered service scopeCommService     
                    scopeComService.add("view");
                    scopeComService.add($scope.tabledata.data[editline]);
                    $location.path('/applicationInfo');
                  });
                } ///end if location.path=applications                                                       

                if ($location.path() == '/groups'){  
                  groupsService.viewGroup({ groupId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (group) {
                    consoleService.printIt("grouppp:=>",group);
                    $scope.tabledata.data[editline].push(group.permissions);
                  })
                  .then(function () {
                    //write data to registered service scopeCommService     
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/groupInfo'); 
                  });  
                }///end if location.path=groups

                if ($location.path() == '/permissions'){
                  scopeComService.add($scope.tabledata.data[editline]);
                  $location.path('/permissionInfo'); 
                }
              }
              //click edit btns  /////////////////////////////////////////////////////                                                            
              $scope.edit_entity= function(editline){
                //query for one entity                        
                if ($location.path() == '/users'){
                  usersService.viewUser({ userId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (user) {
                    consoleService.printIt("userrr:=>",user);
                    $scope.tabledata.data[editline].push(user.groups);
                  }).then(function () {
                    //write data to registered service scopeCommService     
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/userInfo');
                  });
                } ///end if location.path=users    

                if ($location.path() == '/applications'){
                  applicationsService.viewApp({ applicationId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (application) {
                    consoleService.printIt("applicationnn:=>",application);
                    $scope.tabledata.data[editline].push(application.groups);
                  }).then(function () {
                    //write data to registered service scopeCommService     
                    scopeComService.add("edit");
                    scopeComService.add($scope.tabledata.data[editline]);
                    $location.path('/applicationInfo');
                  });
                } ///end if location.path=applications                                                       

                if ($location.path() == '/groups'){  
                  groupsService.viewGroup({ groupId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (group) {
                    consoleService.printIt("grouppp:=>",group);
                    $scope.tabledata.data[editline].push(group.permissions);
                  })
                  .then(function () {
                    //write data to registered service scopeCommService     
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/groupInfo'); 
                  });  
                }///end if location.path=groups

                if ($location.path() == '/permissions'){
                  scopeComService.add($scope.tabledata.data[editline]);
                  $location.path('/permissionInfo'); 
                }
              }
              $scope.create_permission= function(editline){
                //query for one entity                        
                if ($location.path() == '/requestedPermissions'){
                  scopeComService.add("add_requested_permission");
                  scopeComService.add($scope.tabledata.data[editline]);
                  $location.path('/permissionInfo'); 
                }
                // $scope.$apply();
              }
              // click delete btns//////////////////////////////////////////////////////////
              $scope.delete_entity= function(editline){
                var entityName, _id, entity="";
                _id = $scope.tabledata.data[editline][0].value;
                entityName = $scope.tabledata.data[editline][1].value;

                if($location.path()=="/users")
                  entity = "user";
                if($location.path()=="/groups")
                  entity = "group";
                if($location.path()=="/permissions")
                  entity = "permission";
                if($location.path()=="/requestedPermissions")
                  entity = "requestedPermission";
                if($location.path()=="/applications")
                  entity = "application";

                bootbox.confirm("Are you sure you want to delete " + entity + " <b>" + entityName +"</b> ?", function(ok){
                  if (ok){
                    //delete entity 
                    if (entity=="user"){
                      usersService.remove({ userId: _id }, function (response) {
                        consoleService.printIt("User has been deleted successfully."); 
                        //refresh page
                        $window.location.reload();
                      },
                      function (response) {
                        if (response.data == null){
                          consoleService.printIt("response  data is null! -(0)");
                        }
                        else{
                          consoleService.printIt("response (0) ->", response);
                        }
                      });
                    }//end if entity == user

                    else if (entity=="application"){
                      applicationsService.remove({ applicationId: _id }, function (response) {
                        consoleService.printIt("Application has been deleted successfully."); 
                        //refresh page
                        $window.location.reload();
                      },
                      function (response) {
                        if (response.data == null){
                          consoleService.printIt("response  data is null! -(0)");
                        }
                        else{
                          consoleService.printIt("response (0) ->", response);
                        }
                      });
                    }//end if entity == application

                    else if (entity=="group"){
                      groupsService.remove({ groupId: _id }, function (response) {
                        consoleService.printIt("Group has been deleted successfully.");
                        //refresh page
                        $window.location.reload();
                      },
                      function (response) {
                        if (response.data == null){
                          consoleService.printIt("response  data is null! -(0)");
                        }
                        else{
                          consoleService.printIt("response (0) ->", response);
                        }
                      });
                    }//end if entity == group

                    else if (entity=="permission"){
                      permissionsService.remove({ permissionId: _id }, function (response) {
                        consoleService.printIt("Permission has been deleted successfully."); 
                        //refresh page
                        $window.location.reload();
                      },
                      function (response) {
                        if (response.data == null){
                          consoleService.printIt("response  data is null! -(0)");
                        }
                        else{
                          consoleService.printIt("response (0) ->", response);
                        }
                      });
                    }//end if entity == group

                    else if (entity=="requestedPermission"){
                      requestedPermissionsService.remove({ requestedPermissionId: _id }, function (response) {
                        consoleService.printIt("requestedPermission has been deleted successfully."); 
                        //refresh page
                        $window.location.reload();
                      },
                      function (response) {
                        if (response.data == null){
                          consoleService.printIt("response  data is null! -(0)");
                        }
                        else{
                          consoleService.printIt("response (0) ->", response);
                        }
                      });
                    }//end if entity == group
                  } //end if ok
                });
              }
            }, 0);
          }
        })
      }
    }
  }]);