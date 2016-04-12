(function(){
'use strict';

  angular.module("dbdMenuModule").controller("dbdMenuController", dbdMenuController);
  dbdMenuController.$inject= ['$rootScope', '$scope'];
  
  function dbdMenuController($rootScope, $scope) {
    console.log("dbdMenuController");
    function populateMenu(all_states, lang){
      var new_sidebar = [];
      _(all_states).forEach(function (state) {
        if (state.menuData) {
          //console.log("state.menuData: ", state.menuData);
          // break name by dots
          var hier = state.name.split(".");
          // if no dots, create new item
          if (hier.length == 1) {
            new_sidebar.push({
              "title": state.menuData.displayName[lang],
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
              "title": state.menuData.displayName[lang],
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
    }
    var destroyRootscopeWatcherStates =  $rootScope.$watch('states', function (newvalue, oldvalue) {
      console.log("dbdMenuController: watch: states: ", newvalue, $rootScope.lang);
      var all_states = $rootScope.states;
      var lang=$rootScope.lang;
      populateMenu(all_states, lang);
    });
    var destroyRootscopeWatcherLang = $rootScope.$watch('lang', function(newvalue, oldvalue){
      var all_states = $rootScope.states;
      var lang=$rootScope.lang;
      populateMenu(all_states, lang)
    });

    $scope.$on('$destroy', destroyRootscopeWatcherStates);
    $scope.$on('$destroy', destroyRootscopeWatcherLang);
  };
})();