require("authService");
require("contactService");

angular.module("myapp", ["contactServiceModule", "authServiceModule"])

.controller("appCtrl", function($scope, $httpWithProtection, authService, contactService){
    //contactService.write2Console();
    
    authService.login("Admin", "Alma1234").then(function(){
        var http = $httpWithProtection({url: "http://localhost:8080/users", mehtod: "POST"});
        http
            .then(function(data){
                console.log(data)});
    });

    var result = contactService.getContact();
    console.log("getContact: ", result);

    var result = contactService.getContactByExample();
    console.log("getContactByExample: ", result);

    var result = contactService.getContactsInGroup();
    console.log("getContactsInGroup: ", result);

    var result = contactService.addContactToGroup();
    console.log("addContactToGroup: ", result);

    var result = contactService.updateContact();
    console.log("updateContact: ", result);

    var result = contactService.deleteContact();
    console.log("deleteContact: ", result);

    var result = contactService.validateContact();
    console.log("validateContact: ", result);

});