app.directive('requestedPermissions', ['$state', '$timeout', 'scopeComService',
  function ($state, $timeout, scopeComService) {
    return {
      restrict: 'E',
      templateUrl: 'app/requestedPermissions/views/requestedPermissionsTemplate.html',
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
              scopeComService.flush();
              $scope.create_permission= function(editline){
                if ($state.includes('requestedPermissions')){
                  scopeComService.add(null);
                  scopeComService.add(null);
                  scopeComService.add($scope.tabledata.data[editline][1].value);
                  $state.go($scope.tabledata.detailView+".new"); 
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