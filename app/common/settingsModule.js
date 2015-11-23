(function (ng) {
    "use strict";
    ng
        .module("settingsModule",[])
        .constant("appSettings",
        {
            authServerPath: "https://echidna.dotbydot.eu:4451",
            localPath: "http://localhost:8080"
        });
})(angular);
