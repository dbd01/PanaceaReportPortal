"use strict";

angular.module('PanaceaReports').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

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
      name: 'casGetCreds',
      config: {
        url: "/cas/:token/:expires/:user",
        template:  "<div ui-view>Hallo!</div> "
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
        template: '<wwa-dashboard></wwa-dashboard>',
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
      name: 'users.all',
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
      name: 'users.deleted',
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
      name: 'userInfo.view',
      config: {
        url: "/view",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.deleted',
      config: {
        url: "/deleted",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.remove',
      config: {
        url: "/remove",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.edit',
      config: {
        url: "/edit",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.new',
      config: {
        url: "/new",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.add',
      config: {
        url: "/add",
        templateUrl: "app/users/views/userInfoView.html",
        controller: 'userInfoController'
      }
    },
    {
      name: 'userInfo.update',
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
      name: 'groups.all',
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
      name: 'groups.deleted',
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
      name: 'groupInfo.view',
      config: {
        url: "/view",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.deleted',
      config: {
        url: "/deleted",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.remove',
      config: {
        url: "/remove",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.edit',
      config: {
        url: "/edit",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.new',
      config: {
        url: "/new",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.add',
      config: {
        url: "/add",
        templateUrl: "app/groups/views/groupInfoView.html",
        controller: 'groupInfoController'
      }
    },
    {
      name: 'groupInfo.update',
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
      name: 'applications.all',
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
      name: 'applications.deleted',
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
      name: 'applicationInfo.view',
      config: {
        url: "/view",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.deleted',
      config: {
        url: "/deleted",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.remove',
      config: {
        url: "/remove",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.edit',
      config: {
        url: "/edit",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.new',
      config: {
        url: "/new",
        templateUrl: "app/applications/views/applicationInfoView.html",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.add',
      config: {
        url: "/add",
        controller: 'applicationInfoController'
      }
    },
    {
      name: 'applicationInfo.update',
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
      name: 'permissions.all',
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
      name: 'permissions.deleted',
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
      name: 'permissionInfo.view',
      config: {
        url: "/view",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.deleted',
      config: {
        url: "/deleted",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.remove',
      config: {
        url: "/remove",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.edit',
      config: {
        url: "/edit",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.new',
      config: {
        url: "/new",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.add',
      config: {
        url: "/add",
        templateUrl: "app/permissions/views/permissionInfoView.html",
        controller: 'permissionInfoController'
      }
    },
    {
      name: 'permissionInfo.update',
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
  ]

  states.forEach(function (state) {
      $stateProvider.state(state.name, state.config);
  });

  $urlRouterProvider.otherwise("/");
}]);