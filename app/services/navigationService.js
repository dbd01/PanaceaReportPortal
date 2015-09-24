(function () {
    "use strict";

    app
     .factory("navigationService", function () {

        var messages = {};

        messages.list = [];

        messages.add = function (message) {
            messages.list.push(message);
        };

        messages.flush = function (message) {
            messages.list = [];
        };

        return messages;
    });

})();