app.directive('myTable', ['$state', '$timeout', 'scopeComService', 'usersService', 'applicationsService', 'groupsService', 'permissionsService', 'requestedPermissionsService',
  function ($state, $timeout, scopeComService, usersService, applicationsService, groupsService, permissionsService, requestedPermissionsService) {
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
              //console.log($scope.tabledata.detailView);
              var table = $('#' + $scope.tableid);
              var oTable = table.dataTable();
              scopeComService.flush();
              $scope.addNewEntity = function(){
                scopeComService.add("add");
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView);
                }
              }
              $scope.view_entity= function(editline){
                scopeComService.add("view");
                scopeComService.add($scope.tabledata.data[editline][0].value);
                if ($scope.tabledata.mode=="deleted"){
                  scopeComService.add("deleted");
                  $state.go($scope.tabledata.detailViewDeleted);
                }
                else{
                  $state.go($scope.tabledata.detailView);
                }
              }
              $scope.edit_entity= function(editline){
                scopeComService.add("edit");
                scopeComService.add($scope.tabledata.data[editline][0].value);
                if ($scope.tabledata.mode=="deleted"){
                  //error
                }
                else{
                  $state.go($scope.tabledata.detailView);
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
                if ($state.includes('requestedPermissions')){
                  scopeComService.add("add_requested");
                  scopeComService.add($scope.tabledata.data[editline][1].value);
                  $state.go('permissionInfo'); 
                }
              }
              $scope.delete_entity= function(editline){
                var entityName, entity="";
                entityName = $scope.tabledata.data[editline][1].value;
                entity=$scope.tabledata.entity;
                bootbox.confirm("Are you sure you want to delete " + entity + " <b>" + entityName +"</b> ?", function(ok){
                  if (ok){
                    scopeComService.add("remove");
                    scopeComService.add($scope.tabledata.data[editline][0].value);
                    $state.go($scope.tabledata.detailViewRemove);
                  }
                });
              }
            }, 0);
          }
        })
      }
    }
  }]);