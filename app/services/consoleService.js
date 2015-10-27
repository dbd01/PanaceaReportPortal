(function () {
    "use strict";

    app.factory("consoleService", function () {
        
       var showMode =  JSON.parse(modeData);
       console.log("ddddddddddddddddddd", showMode);
       
       var consola={};

       consola.printIt = function(message, obj){
       if (showMode.mode =="true") 
         if (obj == null)
           console.log(message);
         else 
           console.log(message, obj);
       }

       return consola;
    });

})();