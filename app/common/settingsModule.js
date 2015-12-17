﻿(function (ng) {
  "use strict";
  ng
  .module("settingsModule",[])
  .constant("appSettings",{
    authServerPath: "https://echidna.dotbydot.eu:4451",
    casPath : "https://echidna.dotbydot.eu:4457/cas/login/",
    casLogoutPath : "https://echidna.dotbydot.eu:4457/cas/logout", 
    localPath: "http://localhost:8080"
  });
})(angular);

