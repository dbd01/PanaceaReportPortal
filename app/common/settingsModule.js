﻿(function (ng) {
  "use strict";
  ng
  .module("settingsModule",[])
  .constant("appSettings",{
    authServerPath: "http://pandora.dotbydot.eu:4451",
    casPath : "https://pandora.dotbydot.eu:4457/cas/login/",
    casLogoutPath : "https://pandora.dotbydot.eu:4457/cas/logout", 
    localPath: "http://localhost:8080"
  });
})(angular);

