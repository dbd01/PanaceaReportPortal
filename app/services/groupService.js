 "use strict";

    app
        .factory("groupService", ["$resource", "appSettings", "localStorageService", groupService])

    function groupService($resource, appSettings, localStorageService) {

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