 "use strict";

    app
        .factory("usersService", ["$resource", "appSettings", "localStorageService", userService])

    function userService($resource, appSettings, localStorageService) {

        return $resource(appSettings.authServerPath + '/api/v1/user/:userId', {}, {
            query: { 
                method: 'GET', 
                isArray: true ,
                params: { userId: '' },
                headers: { 
                         'Content-Type': 'application/json',
                         'x-access-token': localStorageService.get('authorizationData').token 
                         }
            },            
            add: {
                 method: 'POST',
                 headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': localStorageService.get('authorizationData').token 
                         }
            },
            update: { 
                method: 'PUT',
                params: { userId: '@userId' },
                headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': localStorageService.get('authorizationData').token 
                         } 
            },
             partialUpdate: { 
                method: 'PATCH',
                params: { userId: '@userId' },
                headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': localStorageService.get('authorizationData').token 
                         } 
            },

            remove: { 
                method: 'DELETE',
                params: { userId: '@userId' },
                headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': localStorageService.get('authorizationData').token 
                         } 
            }

        });
    }