require("contactService");
require("authService");
require("userService");

angular.module("myapp", ["contactServiceModule", "authServiceModule", "userServiceModule"])

.controller("appCtrl", function($scope,
                                $httpWithProtection,
                                authService,
                                contactService,
                                userService){

    //Admin login
    var user = {userName: "Admin", password:"Alma12345"};
    authService.login(user).then(function(userData){

        //UserService

        //createUser
        var createUserModel = {
            userName : "createdUser01",
            password : "password01",
            role : "ADMIN"
        };
        userService.createUser(createUserModel).then(function(result){
            console.log(result);
        });

        //changePassword
        var changePasswordModel = {
            oldPassword: "Alma1234",
            newPassword: "Alma12345"
        };
        userService.changeUserPassword(changePasswordModel).then(function(result){
            console.log(result);
        });

        //setRole
        var setRoleModel = {
            userName: "createdUser01",
            role: "USER"
        };
        //userService.setRole(setRoleModel).then(function(result){
        //    console.log(result);
        //});

        //getUser
        var userModel = {
            userName: "createdUser01"
        };
        userService.getUser(userModel).then(function(result){
            console.log(result.data);
        });

        //getUsers
        userService.getUsers().then(function(result){
            console.log(result.data);
        });

    }, function (reason) {
        console.log(reason);
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