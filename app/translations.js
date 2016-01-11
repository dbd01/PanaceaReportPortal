angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('el', {"{{ item.title }}":"{{ item.title }}","Hello {{log_name}}":"Γεια σου {{log_name}}","Login":"Σύνδεση","Or sign in with CAS":"Ή σύνδεση με CAS","Submit":"Υποβολή"});
    gettextCatalog.setStrings('en_US', {"{{ item.title }}":"{{ item.title }}","Hello {{log_name}}":"Hello {{log_name}}","Login":"Login","Or sign in with CAS":"Or sign in with CAS","Submit":"Submit"});
/* jshint +W100 */
}]);