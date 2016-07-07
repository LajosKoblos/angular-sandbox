require("authService");
require("contactService");
require("userService");
require("contactGroupService");

angular.module("myapp", ["contactServiceModule", "authServiceModule", "userServiceModule", "contactGroupServiceModule"])

.controller("appCtrl", function($scope,
                                $httpWithProtection,
                                authService,
                                contactService,
                                userService,
                                contactGroupService){

    //Admin login
    var user = {userName: "Admin", password:"Alma1234"};
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

        //ContactGroupService

        contactGroupService.listGroups().then(function(result) {
            console.log("contactGroupService.listGroups: " + result);
        }, function(reason) {
            console.log(reason);
        });

        var group = {
            "id": {
                "userName":"Admin",
                "contactGroupName":"name1"
            },
            "displayName":"displayName"
        };

        contactGroupService.createGroup(group).then(function(result) {
            console.log(result.status);
        }, function(reason) {
            console.log(reason);
        });

        //ContactService

        contactService.getContact().then(function(result){
            console.log("getContact: ", result);
        }, function (reason) {
            console.log("getContact: ", reason);
        });

        contactService.getContactByExample().then(function (result) {
            console.log("getContactByExample: ", result);
        }, function (reason) {
            console.log("getContactByExample: ", reason);
        });

        contactService.getContactsInGroup().then(function (result) {
            console.log("getContactsInGroup: ", result);
        }, function (reason) {
            console.log("getContactsInGroup: ", reason);
        });

        contactService.addContactToGroup().then(function (result) {
            console.log("addContactToGroup: ", result);
        }, function (reason) {
            console.log("addContactToGroup: ", reason);
        });

        contactService.updateContact().then(function (result) {
            console.log("updateContact: ", result);
        }, function (reason) {
            console.log("updateContact: ", reason);
        });

        contactService.deleteContact().then(function (result) {
            console.log("deleteContact: ", result);
        }, function (reason) {
            console.log("deleteContact: ", reason);
        });

        contactService.validateContact().then(function (result) {
            console.log("validateContact: ", result);
        }, function (reason) {
            console.log("validateContact: ", reason);
        });
    }, function (reason) {
        console.log(reason);
    });
});