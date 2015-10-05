 "use strict";

    app
        .factory("usersService", ["$resource", "appSettings", "localStorageService", userService])

    function userService($resource, appSettings, localStorageService) {

        return $resource(appSettings.authServerPath + '/api/v1/user/:userId', {}, {
            query: { 
                method: 'GET', 
                isArray: true ,
                params: { userId: '' }               
            }, 
            viewUser: {
                 method: 'GET',
                 params: { userId: '@userId' }
            },           
            add: {
                 method: 'POST'                 
            },
            update: { 
                method: 'PUT',
                params: { userId: '@userId' }
                
            },
             partialUpdate: { 
                method: 'PATCH',
                params: { userId: '@userId' }               
            },

            remove: { 
                method: 'DELETE',
                params: { userId: '@userId' }                
            }

        });
    }