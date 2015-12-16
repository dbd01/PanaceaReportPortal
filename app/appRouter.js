'use strict';
 
app
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  console.log("appRouter"); 
  $stateProvider
    .state('lala', {
      url: "/",
      template: "<div ui-view>Hallo!</div> "
    })
    .state('casGetCreds', {
      url: "/:token/:expires/:user",
      template: "Hallo!"  ,
      controller: 'authenticationController'
     })
    .state('lala.logged_in', {
      url: "welcome",
      templateUrl: "app/auth/views/logged_inView.html",
      controller: 'loggedInController'
    })
    .state('logout', {
      url: "/",
      template: "<div> Bye bye </div>",
      controller: 'logoutController',
      menuData: {
        displayName: "Logout",
        icon:"glyphicon glyphicon-log-out"
      }
    })
    /*.state('register', {
      url: "register",
      templateUrl: "app/auth/views/registerView.html",
      controller: 'registrationController'
    })*/
    .state('reports', {
      url: "/reports",
      templateUrl: "app/reports/views/reportsView.html",
      controller: 'reportsController',
      menuData: {
        displayName: "Reports"
      }
    })
    .state('users', {
      url: "/users",
      template:'<div ui-view></div>',
      menuData: {
        displayName: "Users",
        icon:"glyphicon glyphicon-user"
      }
    })
    .state('users.all', {
      url: "/all",
      templateUrl: "app/users/views/usersView.html",
      controller: 'usersController',
      menuData: {
        displayName: "All"
      }
    })
    .state('users.deleted', {
      url: "/deleted",
      templateUrl: "app/users/views/usersView.html",
      controller: 'usersController',
      menuData: {
        displayName: "Deleted",
        icon: "glyphicon glyphicon-remove"
      }
    })
    .state('userInfo', {
      url: "/userInfo",
      templateUrl: "app/users/views/userInfoView.html",
      controller: 'userInfoController'
    })
    .state('groups', {
      url: "/groups",
      template:'<div ui-view></div>',
      menuData: {
        displayName: "Groups"
      }
    })
    .state('groups.all', {
      url: "/all",
      templateUrl: "app/groups/views/groupsView.html",
      controller:  'groupsController',
      menuData: {
        displayName: "All"
      }
    })
    .state('groups.deleted', {
      url: "/deleted",
      templateUrl: "app/groups/views/groupsView.html",
      controller:  'groupsController',
      menuData: {
        displayName: "Deleted"
      }
    })
    .state('groupInfo', {
      url: "/groupInfo",
      templateUrl: "app/groups/views/groupInfoView.html",
      controller:  'groupInfoController'
    })
    .state('applications', {
      url: "/applications",
      template:'<div ui-view></div>',
      menuData: {
        displayName: "Applications"
      }
    })
    .state('applications.all', {
      url: "/all",
      templateUrl: "app/applications/views/applicationsView.html",
      controller:  'applicationsController',
      menuData: {
        displayName: "All"
      }
    })
    .state('applications.deleted', {
      url: "/deleted",
      templateUrl: "app/applications/views/applicationsView.html",
      controller:  'applicationsController',
      menuData: {
        displayName: "Deleted"
      }
    })
    .state('applicationInfo', {
      url: "/applicationInfo",
      templateUrl: "app/applications/views/applicationInfoView.html",
      controller:  'applicationInfoController'
    })
    .state('applicationInfodeleted', {
      url: "/applicationInfoDeleted",
      templateUrl: "app/applications/views/applicationInfoView.html",
      controller:  'applicationInfoController'
    })
    .state('permissions', {
      url: "/permissions",
      template:'<div ui-view></div>',
      menuData: {
        displayName: "Permissions"
      }
    })
    .state('permissions.all', {
      url: "/all",
      templateUrl: "app/permissions/views/permissionsView.html",
      controller:  'permissionsController',
      menuData: {
        displayName: "All"
      }
    })
    .state('permissions.deleted', {
      url: "/deleted",
      templateUrl: "app/permissions/views/permissionsView.html",
      controller:  'permissionsController',
      menuData: {
        displayName: "Deleted"
      }
    })
    .state('permissionInfo', {
      url: "/permissionInfo",
      templateUrl: "app/permissions/views/permissionInfoView.html",
      controller:  'permissionInfoController'
    })
    .state('requestedPermissions', {
      url: "/requestedPermissions",
      templateUrl: "app/requestedPermissions/views/requestedPermissionsView.html",
      controller:  'requestedPermissionsController',
      menuData: {
        displayName: "Requested Permissions"
      }
    })
    .state('requestedPermissionInfo', {
      url: "/requestedPermissionInfo",
      templateUrl: "app/requestedPermissions/views/requestedPermissionInfoView.html",
      controller:  'requestedPermissionInfoController'
    });
  console.log("appRouter: OK");
}]);
