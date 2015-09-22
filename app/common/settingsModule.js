(function (ng) {
    "use strict";
    ng
        .module("settingsModule",[])
        .constant("appSettings",
        {
            serverPath: "http://echidna.dotbydot.eu:4444",
            localPath: "http://localhost:49191"
        });
})(angular);