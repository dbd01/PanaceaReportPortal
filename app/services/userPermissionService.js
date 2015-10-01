 "use strict";

    app
        .factory("userPermissionService", ["$resource", "appSettings", "localStorageService", userPermissionService])

    function userPermissionService($resource, appSettings, localStorageService) {

        return $resource(appSettings.authServerPath + '/api/v1/userpermission/:user/:userId/:permission/:permissionId', {}, {
                       
            deleteUserFromAllPermissions: { 
                method: 'DELETE',
                params: { user: 'user',
                          userId: '@userId',
                          permission: '',
                          permissionId: ''
                        }
            },
            deleteUserFromPermission: { 
                method: 'DELETE',
                params: { user: 'user',
                          userId: '@userId',
                          permission: 'permission',
                          permissionId: '@permissionId'
                        }
            }


        });
    }