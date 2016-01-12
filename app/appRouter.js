"use strict";
//var $stateProviderReference;
angular.module('PanaceaReports').config(['$stateProvider', '$urlRouterProvider',  function ($stateProvider, $urlRouterProvider) {
  //$stateProviderReference = $stateProvider;

  var states=[
    {
      name: 'start',
      config: {
        url: "/",
        template: "<div ui-view>Hallo!</div> "
      }
    },
    {
      name: 'start.logged_in',
      config: {
        url: "welcome",
        templateUrl: "app/auth/views/logged_inView.html",
        controller: 'loggedInController'
      }
    },
    {
      name: 'start.casGetCreds',
      config: {
        url: "cas/:token/:expires/:user",
        template:  "<div ui-view>Hallo!</div> ",
        controller: 'casController'
      }
    },
    {
      name: 'logout',
      config: {
        url: "/",
        template: "<div> Bye bye </div>",
        controller: 'logoutController',
        menuData: {
          displayName: "Logout",
          icon:"glyphicon glyphicon-log-out"
        }
      }
    },
    {
      name:'dashboard',
      config: {
        url: '/dashboard',
        template: '<widget-dashboard></widget-dashboard>',
        menuData: {
          displayName: "Dashboard"
        }
      }
    },
    {
      name: 'reports',
      config: {
        url: "/reports",
        templateUrl: "app/reports/views/reportsView.html",
        controller: 'reportsController',
        menuData: {
          displayName: "Reports"
        }
      }
    },
    {
      name: 'users',
      config: {
        url: "/users",
        template:'<div ui-view></div>',
        menuData: {
          displayName: "Users",
          icon:"glyphicon glyphicon-user"
        }
      }
    },
    {
      name: 'users.allUsers',
      config: {
        url: "/all",
        templateUrl: "app/users/views/usersView.html",
        controller: 'usersController',
        menuData: {
          displayName: "All"
        }
      }
    },
    {
      name: 'users.deletedUsers',
      config: {
         url: "/deleted",
        templateUrl: "app/users/views/usersView.html",
        controller: 'usersController',
        menuData: {
          displayName: "Deleted",
          icon: "glyphicon glyphicon-remove"
        }
      }
    },
    {
      name: 'userInfo',
      config: {
        url: "/userInfo",
        template: '<div ui-view></div>',
      }
    },
    {
      name: 'userInfo.viewUser',
      config: {
        url: "/view",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.deletedUser',
      config: {
        url: "/deleted",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.removeUser',
      config: {
        url: "/remove",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.editUser',
      config: {
        url: "/edit",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.newUser',
      config: {
        url: "/new",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.addUser',
      config: {
        url: "/add",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.updateUser',
      config: {
        url: "/update",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'groups',
      config: {
        url: "/groups",
        template:'<div ui-view></div>',
        menuData: {
          displayName: "Groups"
        }
      }
    },
    {
      name: 'groups.allGroups',
      config: {
        url: "/all",
        templateUrl: "app/groups/views/groupsView.html",
        controller:  'groupsController',
        menuData: {
          displayName: "All"
        }
      }
    },
    {
      name: 'groups.deletedGroups',
      config: {
        url: "/deleted",
        templateUrl: "app/groups/views/groupsView.html",
        controller:  'groupsController',
        menuData: {
          displayName: "Deleted"
        }
      }
    },
    {
      name: 'groupInfo',
      config: {
        url: "/groupInfo",
        template:'<div ui-view></div>',
      }
    },
    {
      name: 'groupInfo.viewGroup',
      config: {
        url: "/view",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.deletedGroup',
      config: {
        url: "/deleted",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.removeGroup',
      config: {
        url: "/remove",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.editGroup',
      config: {
        url: "/edit",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.newGroup',
      config: {
        url: "/new",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.addGroup',
      config: {
        url: "/add",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.updateGroup',
      config: {
        url: "/update",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'applications',
      config: {
        url:"/applications",
        template:'<div ui-view></div>',
        menuData: {
          displayName: "Applications"
        }
      }
    },
    {
      name: 'applications.allApplications',
      config: {
        url: "/all",
        templateUrl: "app/applications/views/applicationsView.html",
        controller:  'applicationsController',
        menuData: {
          displayName: "All"
        }
      }
    },
    {
      name: 'applications.deletedApplications',
      config: {
        url: "/deleted",
        templateUrl: "app/applications/views/applicationsView.html",
        controller:  'applicationsController',
        menuData: {
          displayName: "Deleted"
        }
      }
    },
    {
      name: 'applicationInfo',
      config: {
        url: "/applicationInfo",
        template:'<div ui-view></div>',
      }
    },
    {
      name: 'applicationInfo.viewApplication',
      config: {
        url: "/view",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.deletedApplication',
      config: {
        url: "/deleted",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.removeApplication',
      config: {
        url: "/remove",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.editApplication',
      config: {
        url: "/edit",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.newApplication',
      config: {
        url: "/new",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.addApplication',
      config: {
        url: "/add",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.updateApplication',
      config: {
        url: "/update",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'permissions',
      config: {
        url: "/permissions",
        template:'<div ui-view></div>',
        menuData: {
          displayName: "Permissions"
        }
      }
    },
    {
      name: 'permissions.allPermissions',
      config: {
        url: "/all",
        templateUrl: "app/permissions/views/permissionsView.html",
        controller:  'permissionsController',
        menuData: {
          displayName: "All"
        }
      }
    },
    {
      name: 'permissions.deletedPermissions',
      config: {
        url: "/deleted",
        templateUrl: "app/permissions/views/permissionsView.html",
        controller:  'permissionsController',
        menuData: {
          displayName: "Deleted"
        }
      }
    },
    {
      name: 'permissionInfo',
      config: {
        url: "/permissionInfo",
        template:'<div ui-view></div>',
      }
    },
    {
      name: 'permissionInfo.viewPermission',
      config: {
        url: "/view",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.deletedPermission',
      config: {
        url: "/deleted",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.removePermission',
      config: {
        url: "/remove",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.editPermission',
      config: {
        url: "/edit",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.newPermission',
      config: {
        url: "/new",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.addPermission',
      config: {
        url: "/add",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.updatePermission',
      config: {
        url: "/update",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'requestedPermissions',
      config: {
        url: "/requestedPermissions",
        templateUrl: "app/requestedPermissions/views/requestedPermissionsView.html",
        controller:  'requestedPermissionsController',
        menuData: {
          displayName: "Requested Permissions"
        }
      }
    },
    {
      name: 'requestedPermissionsInfo',
      config: {
        url: "/requestedPermissionInfo",
        templateUrl: "app/requestedPermissions/views/requestedPermissionInfoView.html",
        controller:  'requestedPermissionInfoController'
      }
    }
  ];
  states.forEach(function (state) {
    $stateProvider.state(state.name, state.config);
  });
  $urlRouterProvider.otherwise("/");
}]);