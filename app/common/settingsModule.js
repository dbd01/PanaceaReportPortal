(function (ng) {
  "use strict";
  ng
  .module("settingsModule",[])
  .constant("appSettings",{
    authServerPath: "http://localhost:4451",
    casPath : "http://localhost:4457/cas/login/",
    casLogoutPath : "http://localhost:4457/cas/logout", 
    localPath: "http://localhost:4453"
  });
})(angular);

