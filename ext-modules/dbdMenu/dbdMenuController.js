'use strict';

angular.module("dbdMenuModule").controller("dbdMenuController", ['$rootScope', '$scope', 
  function ($rootScope, $scope) {
    console.log("dbdMenuController");
    $rootScope.$watch('states', function (newvalue, oldvalue) {
      console.log("dbdMenuController: watch: states: ", newvalue);
      var all_states = $rootScope.states;
      var new_sidebar = [];
      _(all_states).forEach(function (state) {
        if (state.menuData) {
          //console.log("state.menuData: ", state.menuData);
          // break name by dots
          var hier = state.name.split(".");
          // if no dots, create new item
          if (hier.length == 1) {
            new_sidebar.push({
              "title": state.menuData.displayName,
              "state": state.name,
              "url": "#" + state.url,
              "icon": state.menuData.icon,
              "children": []
            });
          }
          // if one dot, add to children of parent
          if (hier.length == 2) {
            // find the parent
            var position =_.findIndex(new_sidebar, function (chr) {
              return chr.state == hier[0];
            });
            // add to the parents childre the current node
            new_sidebar[position].children.push({
              "title": state.menuData.displayName,
              "state": state.name,
              "url": "#" + state.url,
              "icon": state.menuData.icon,
              "children": []
            })
          }
          if (hier.length > 2) {
            $log.debug('problem at ', hier )
          }
        }
      }).value();
      console.log(new_sidebar);
      $scope.sidebar=new_sidebar;
    });

    /*$scope.login = function () {
      console.log("polyphemusController: login: authData: ", $scope.authData);
      polyphemusService.send($scope.authData, 
        //success
        function (response) {
          //set the token
          console.log("polyphemusController: login: response: ", response);
          console.log("polyphemusController: login: authData: ", $scope.authData);
          var authorizationData={
            token: response.token,
            userName: $scope.authData.username, 
            expires: response.expires
          };
          //$rootScope.authorizationData=authorizationData;
          //$rootScope.$broadcast("authData");
          console.log("polyphemusController: login: $broadcast");
          //$rootscope.broadcast(authorizationData);
          polyphemusCommService2.setValue(authorizationData);
        },
        //error
        function (response) {
          console.log("data..>",$scope.authData);
          if (response.data == null){
            console.log("response data is null!");
            $scope.message = "Server error";
          }
          else{
            console.log("response error: ", response);
            $scope.alert = { 
              type: 'danger', 
              msg: 'Wrong Username or password' 
            };
          }
        }
      );
};*/
}]);

