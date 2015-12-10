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
        tableresult: '='
      },
      link: function ($scope, element, attrs) {
        $scope.$watch('ready', function (newvalue, oldvalue) {
          if (newvalue=="true") {
            $timeout(function () {
              if ($scope.tabledata.mode=='editable')
                $scope.toolbar_width = "col-md-6";
              else
                $scope.toolbar_width = "col-md-12";
              console.log($scope.tabledata.mode)
              console.log($scope.tabledata)
              var table = $('#' + $scope.tableid);
              var oTable = table.dataTable(); 
              $scope.addNewEntity = function(){
                if($location.path()=="/users"){
                  scopeComService.add("add");
                  $location.path('/userInfo');
                }
                if($location.path()=="/groups"){
                  scopeComService.add("add");
                  $location.path('/groupInfo');
                }
                if($location.path()=="/applications"){
                  scopeComService.add("add");
                  $location.path('/applicationInfo');
                }
                if($location.path()=="/permissions"){
                  scopeComService.add("add");
                  $location.path('/permissionInfo');
                }
              }
              $scope.view_entity= function(editline){
                if ($location.path() == '/users' || $location.path() == '/usersDeleted' ){
                  usersService.viewUser({ userId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (user) {
                    console.log("user.groups: ", user.groups);
                    $scope.tabledata.data[editline].push(user.groups);
                  }).then(function () {
                    scopeComService.add("view");
                    scopeComService.add($scope.tabledata.data[editline]);
                    if ($scope.tabledata.mode=="deleted")
                      scopeComService.add("deleted");
                    $location.path('/userInfo');
                  });
                }
                if ($location.path() == '/applications' || $location.path() == '/applicationsDeleted'){
                  applicationsService.viewApp({ applicationId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (application) {
                    consoleService.printIt("applicationnn:=>",application);
                    $scope.tabledata.data[editline].push(application.groups);
                  }).then(function () {
                    scopeComService.add("view");
                    scopeComService.add($scope.tabledata.data[editline]);
                    if ($scope.tabledata.mode=="deleted")
                      scopeComService.add("deleted");
                    $location.path('/applicationInfo');
                  });
                }
                if ($location.path() == '/groups' || $location.path() == '/groupsDeleted'){  
                  groupsService.viewGroup({ groupId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (group) {
                    consoleService.printIt("grouppp:=>",group);
                    $scope.tabledata.data[editline].push(group.permissions);
                    $scope.tabledata.data[editline].push(group.applications);
                    $scope.tabledata.data[editline].push(group.users);
                  })
                  .then(function () {
                    scopeComService.add("view");
                    scopeComService.add($scope.tabledata.data[editline]);
                    if ($scope.tabledata.mode=="deleted")
                      scopeComService.add("deleted");
                    $location.path('/groupInfo'); 
                  });  
                }
                if ($location.path() == '/permissions' || $location.path() == '/permissionsDeleted'){
                  permissionsService.viewPerm({permissionId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (permission) {
                    consoleService.printIt("permission:=>",permission);
                    $scope.tabledata.data[editline].push(permission.groups);
                  }).then(function () {
                    scopeComService.add("view");
                    scopeComService.add($scope.tabledata.data[editline]);
                    if ($scope.tabledata.mode=="deleted")
                      scopeComService.add("deleted");
                    $location.path('/permissionInfo');
                  });
                }
              }
              $scope.edit_entity= function(editline){
                if ($location.path() == '/users'){
                  usersService.viewUser({ userId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (user) {
                    consoleService.printIt("userrr:=>",user);
                    $scope.tabledata.data[editline].push(user.groups);
                  }).then(function () {
                    scopeComService.add("edit");
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/userInfo');
                  });
                }
                if ($location.path() == '/applications'){
                  applicationsService.viewApp({ applicationId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (application) {
                    consoleService.printIt("applicationnn:=>",application);
                    $scope.tabledata.data[editline].push(application.groups);
                  }).then(function () {
                    scopeComService.add("edit");
                    scopeComService.add($scope.tabledata.data[editline]);
                    $location.path('/applicationInfo');
                  });
                }
                if ($location.path() == '/groups'){  
                  groupsService.viewGroup({ groupId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (group) {
                    consoleService.printIt("grouppp:=>",group);
                    $scope.tabledata.data[editline].push(group.permissions);
                    $scope.tabledata.data[editline].push(group.applications);
                    $scope.tabledata.data[editline].push(group.users);
                  })
                  .then(function () {
                    scopeComService.add("edit");
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/groupInfo'); 
                  });  
                }
                if ($location.path() == '/permissions'){
                  permissionsService.viewPerm({permissionId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (permission) {
                    consoleService.printIt("permission:=>",permission);
                    console.log("permission.groups: ",permission.groups);
                    $scope.tabledata.data[editline].push(permission.groups);
                  }).then(function () {
                    scopeComService.add("edit");
                    scopeComService.add($scope.tabledata.data[editline]);
                    $location.path('/permissionInfo');
                  });
                }
              }
              $scope.restore_entity= function(editline){
                //TODO : restore the deleted row 
                /*if ($location.path() == '/usersDeleted'){
                  usersService.viewUser({ userId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (user) {
                    consoleService.printIt("userrr:=>",user);
                    $scope.tabledata.data[editline].push(user.groups);
                  }).then(function () {
                    scopeComService.add("view");
                    scopeComService.add($scope.tabledata.data[editline]);
                    scopeComService.add("deleted");
                    $location.path('/userInfo');
                  });
                }
                if ($location.path() == '/applicationsDeleted'){
                  applicationsService.viewApp({ applicationId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (application) {
                    consoleService.printIt("applicationnn:=>",application);
                    $scope.tabledata.data[editline].push(application.groups);
                  }).then(function () {
                    scopeComService.add("restore");
                    scopeComService.add($scope.tabledata.data[editline]);
                    $location.path('/applicationInfo');
                  });
                }
                if ($location.path() == '/groupsDeleted'){  
                  groupsService.viewGroup({ groupId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (group) {
                    consoleService.printIt("grouppp:=>",group);
                    $scope.tabledata.data[editline].push(group.permissions);
                    $scope.tabledata.data[editline].push(group.applications);
                    $scope.tabledata.data[editline].push(group.users);
                  })
                  .then(function () {
                    scopeComService.add("restore");
                    scopeComService.add($scope.tabledata.data[editline]); 
                    $location.path('/groupInfo'); 
                  });  
                }
                if ($location.path() == '/permissionsDeleted'){
                  permissionsService.viewPerm({permissionId: $scope.tabledata.data[editline][0].value}).$promise
                  .then(function (permission) {
                    consoleService.printIt("permission:=>",permission);
                    console.log("permission.groups: ",permission.groups);
                    $scope.tabledata.data[editline].push(permission.groups);
                  }).then(function () {
                    scopeComService.add("restore");
                    scopeComService.add($scope.tabledata.data[editline]);
                    $location.path('/permissionInfo');
                  });
                }*/
              }
              $scope.create_permission= function(editline){
                if ($location.path() == '/requestedPermissions'){
                  scopeComService.add("add_requested");
                  scopeComService.add($scope.tabledata.data[editline]);
                  $location.path('/permissionInfo'); 
                }
              }
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
                    if (entity=="user"){
                      usersService.remove({ userId: _id }, function (response) {
                        consoleService.printIt("User has been deleted successfully."); 
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
                    }
                    else if (entity=="application"){
                      applicationsService.remove({ applicationId: _id }, function (response) {
                        consoleService.printIt("Application has been deleted successfully."); 
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
                    }
                    else if (entity=="group"){
                      groupsService.remove({ groupId: _id }, function (response) {
                        consoleService.printIt("Group has been deleted successfully.");
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
                    }
                    else if (entity=="permission"){
                      permissionsService.remove({ permissionId: _id }, function (response) {
                        consoleService.printIt("Permission has been deleted successfully."); 
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
                    }
                    else if (entity=="requestedPermission"){
                      requestedPermissionsService.remove({ requestedPermissionId: _id }, function (response) {
                        consoleService.printIt("requestedPermission has been deleted successfully."); 
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
                    }
                  }
                });
              }
            }, 0);
          }
        })
      }
    }
  }]);