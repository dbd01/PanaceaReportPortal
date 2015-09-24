 "use strict";

    app
        .factory("usersService", ["$resource", "appSettings", "localStorageService", userService])

    function userService($resource, appSettings, localStorageService) {

        return $resource(appSettings.authServerPath + '/api/v1/users', {}, {
            query: { 
                method: 'GET', 
                isArray: true ,
                headers: { 
                    'Content-Type': 'application/json',
                    'x-access-token': localStorageService.get('authorizationData').token }
                }
        });
    }