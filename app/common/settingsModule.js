(function (ng) {
    "use strict";
    ng
        .module("settingsModule",[])
        .constant("appSettings",
        {
            authServerPath: "http://192.168.11.239:10001",
            localPath: "http://localhost:8080"
        });
})(angular);
