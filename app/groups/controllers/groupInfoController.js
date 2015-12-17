"use strict";

app.controller("groupInfoController", ['$state', 'groupsService', 'permissionsService', '$scope', 'scopeComService',
  function ($state, groupsService, permissionsService, $scope , scopeComService) {
    var groupTable ={
      "group": null,
      "permissions": [],
      "ready": false
    }
    var mode=scopeComService.list[0];
    var _id=scopeComService.list[1];
    var deleted=false;
    if (scopeComService.list.length==3)
      deleted=true;
    scopeComService.flush();
    if (mode=='remove'){
       groupsService.remove({ groupId: _id }, function (response) {
        console.log("Group has been deleted successfully."); 
        $state.go('groups.all')
      },function (response) {
        if (response.data == null){
          console.log("response  data is null! -(0)");
        }
        else{
          console.log("response (0) ->", response);
        }
      });
    }
    else if (mode=='add'){

    }
    else{
      var group=groupsService.getOne({groupId: _id}, function(){
        var permissions=permissionsService.query(function(){
          groupTable.group=group;
          groupTable.permissions=permissions;
          $scope.groupTable = groupTable;
          scopeComService.add(mode);
          if (deleted)
            scopeComService.add("deleted");
          $scope.groupTable.ready = true;
        });
      });
    }
  }]);

