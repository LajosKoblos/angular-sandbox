require("authService");
require("contactService");
require("userService");
require("contactGroupService");

angular.module("myapp", ["contactServiceModule", "authServiceModule", "userServiceModule", "contactGroupServiceModule"])

    .controller("appCtrl", function ($scope,
                                     $httpWithProtection,
                                     authService,
                                     contactService,
                                     userService,
                                     contactGroupService) {

        //Admin login
        var user = {userName: "Admin", password: "Alma1234"};
        authService.login(user).then(function (userData) {


            var logoutModel =
            {
                "userName" : "Admin"
            };
            authService.logout(logoutModel).then(function (result) {
                console.log(result);
            }), function (reason) {
                console.log(reason);
            };

            //UserService

            //createUser
            var createUserModel = {
                userName: "createdUser01",
                password: "password01",
                role: "ADMIN"
            };
            userService.createUser(createUserModel).then(function (result) {
                console.log(result);
            });

            //changePassword
            //var changePasswordModel = {
            //    oldPassword: "Alma1234",
            //    newPassword: "Alma12345"
            //};
            //userService.changeUserPassword(changePasswordModel).then(function (result) {
            //    console.log(result);
            //});

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
            userService.getUser(userModel).then(function (result) {
                console.log(result.data);
            });

            //getUsers
            userService.getUsers().then(function (result) {
                console.log(result.data);
            });

            //ContactGroupService

            contactGroupService.listGroups().then(function (result) {
                console.log("contactGroupService.listGroups: " + result);
            }, function (reason) {
                console.log(reason);
            });

            var group = {
                "id": {
                    "userName": "Admin",
                    "contactGroupName": "name1"
                },
                "displayName": "displayName"
            };

            contactGroupService.createGroup(group).then(function (result) {
                console.log(result.status);
            }, function (reason) {
                console.log(reason);
            });

            //ContactService

            var newContact = {
                "firstName": "firstName",
                "lastName": "lastName",
                "workEmail": "work@email.email",
                "nickName": "nickName",
                "jobTitle": "jobTitle"
            };

            contactService.addContactToGroup("name1", newContact).then(function (result) {
                console.log("addContactToGroup: ", result);

                contactService.getContact("name1", "1").then(function (result) {
                    console.log("getContact: ", result);

                    var modifiedContact = {
                        "firstName": "new firstName",
                        "lastName": "new lastName",
                        "workEmail": "new work@email.email",
                        "nickName": "new nickName",
                        "jobTitle": "new jobTitle"
                    };

                    contactService.updateContact("name1", "1", modifiedContact).then(function (result) {
                        console.log("updateContact: ", result);

                        contactService.getContact("name1", "1").then(function (result) {
                            console.log("getContact: ", result);

                            contactService.deleteContact("name1", "1").then(function (result) {
                                console.log("deleteContact: ", result);
                            }, function (reason) {
                                console.log("deleteContact: ", reason);
                            });
                        }, function (reason) {
                            console.log("getContact: ", reason);
                        });
                    }, function (reason) {
                        console.log("updateContact: ", reason);
                    });
                }, function (reason) {
                    console.log("getContact: ", reason);
                });

                contactService.getContactByExample().then(function (result) {
                    console.log("getContactByExample: ", result);
                }, function (reason) {
                    console.log("getContactByExample: ", reason);
                });

                contactService.getContactsInGroup("name1").then(function (result) {
                    console.log("getContactsInGroup: ", result);
                }, function (reason) {
                    console.log("getContactsInGroup: ", reason);
                });


            }, function (reason) {
                console.log("addContactToGroup: ", reason);
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