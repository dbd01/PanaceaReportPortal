(function () {
    "use strict";

    app
        .factory("authenticationService", ["$resource", "appSettings", authenticationService])

    function authenticationService($resource, appSettings) {

        return $resource(appSettings.authServerPath + '/login', {}, {
            send: { method: 'POST' }            
        });
    }

})();