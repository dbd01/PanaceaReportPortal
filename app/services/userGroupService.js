 "use strict";

    app
        .factory("userGroupService", ["$resource", "appSettings", "localStorageService", userGroupService])

    function userGroupService($resource, appSettings, localStorageService) {

        return $resource(appSettings.authServerPath + '/api/v1/usergroup/:user/:userId/:group/:groupId', {}, {
                       
            deleteUserFromAllGroups: { 
                method: 'DELETE',
                params: { user: 'user',
                          userId: '@userId',
                          group: '',
                          groupId: ''
                        }
            },
            deleteUserFromGroup: { 
                method: 'DELETE',
                params: { user: 'user',
                          userId: '@userId',
                          group: 'group',
                          groupId: '@groupId'
                        }
            }

        });
    }