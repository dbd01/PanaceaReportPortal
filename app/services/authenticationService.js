(function () {
    "use strict";

    app
        .factory("authenticationService", ["$resource", "appSettings", portalService])

    function portalService($resource, appSettings) {

        return $resource(appSettings.serverPath + '/api/model/PortalModel/:portalId', {}, {
            query: { method: 'GET', params: { portalId: '' }, isArray: true },
            view: { method: 'GET', params: { portalId: '@portalId' } },
            add: { method: 'POST' },
            update: { method: 'PUT', params: { portalId: '@portalId' } },
            remove: { method: 'DELETE', params: { portalId: '@portalId' } }
        });
    }

})();