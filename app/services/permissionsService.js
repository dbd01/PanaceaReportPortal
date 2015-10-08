 "use strict";

    app
        .factory("permissionsService", ["$resource", "appSettings", "localStorageService", permissionsService])

    function permissionsService($resource, appSettings, localStorageService) {

        return $resource(appSettings.authServerPath + '/api/v1/permission/:permissionId', {}, {
                       
            query: { 
                method: 'GET', 
                isArray: true ,
                params: { permissionId: '' }               
            },            
            add: {
                 method: 'POST'                 
            },
            update: { 
                method: 'PUT',
                params: { permissionId: '@permissionId' }
                
            },
             partialUpdate: { 
                method: 'PATCH',
                params: { permissionId: '@permissionId' }               
            },

            remove: { 
                method: 'DELETE',
                params: { permissionId: '@permissionId' }                
            }

        });
    }