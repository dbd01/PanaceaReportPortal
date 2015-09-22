(function () {
    "use strict";

    app
        .factory("authenticationService", ["$resource", "appSettings", authService])

    function authService($resource, appSettings) {

        return $resource(appSettings.authServerPath + '/login', {}, {
            query: { method: 'GET', params: { portalId: '' }, isArray: true },
            view: { method: 'GET', params: { portalId: '@portalId' } },
            add: { method: 'POST' },
            update: { method: 'PUT', params: { portalId: '@portalId' } },
            remove: { method: 'DELETE', params: { portalId: '@portalId' } }
        });
    }

})();