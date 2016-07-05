require("authService");
require("contactService");

angular.module("myapp", ["contactServiceModule"])

.controller("appCtrl", function(contactService){
    contactService.write2Console();
});