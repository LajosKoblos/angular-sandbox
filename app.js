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


});