(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            console.log("contactGroupService.listGroups FAILED: " + reason);
        });

        var group = {
            "id": {
                "userName":"Admin",
                "contactGroupName":"name1"
            },
            "displayName":"displayName"
        };

        contactGroupService.createGroup(group).then(function(result) {
            console.log("contactGroupService.createGroup: " + result.status);
        }, function(reason) {
            console.log("contactGroupService.createGroup FAILED: " + reason);
        });


    }, function (reason) {
        console.log("reason: " + reason);
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
},{"authService":2,"contactGroupService":3,"contactService":4,"userService":5}],2:[function(require,module,exports){
var authService = angular.module("authServiceModule", []);

authService.factory("$httpWithProtection", function ($http, authService) {
    var http = function (config) {
        config.headers = {};
        config.headers.Authorization = "Bearer " + authService.getTokenId();
        return $http(config);
    };
    return http;
});

authService.factory("authService", function ($http, $q) {
    var token;

    function login(userModel) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:8080/login',
            data: userModel
        }).then(function (result) {
            token = result.data.tokenId;
            deferred.resolve({tokenId: result.data.tokenId, role: result.data.role});
        }, function (reason) {
            deferred.reject(reason);
        });

        return deferred.promise;
    };

    function getTokenId(){
        return token;
    };

    function logout() {
        token = null;
    };

    return {login: login, logout: logout, getTokenId: getTokenId};
});


},{}],3:[function(require,module,exports){
angular.module("contactGroupServiceModule", ["authServiceModule"])

.factory("contactGroupService", function ($httpWithProtection, $q) {

	var fac = {};

	fac.listGroups = function() {

		var deferred = $q.defer();

        var config = {
            url: "http://localhost:8080/groups",
            method: "GET"
        };

		var httpPromise = $httpWithProtection(config);

		httpPromise.then(function(result) {
            deferred.resolve(result);
		}, function(error){
            deferred.reject(createServerErrorObject(error));
		});

		return deferred.promise;
	};

	fac.createGroup = function(groupObject) {

        var deferred = $q.defer();

        if(typeof groupObject.id.contactGroupName === 'undefined' || typeof groupObject.displayName === 'undefined' || groupObject.id.contactGroupName == "" || groupObject.displayName == "") {

            var fieldsObject = {};

            if(typeof groupObject.id.contactGroupName === 'undefined' || groupObject.id.contactGroupName == "") {
                fieldsObject.name = ["name is required"];
            }

            if (typeof groupObject.displayName === 'undefined' || groupObject.displayName == "") {
                fieldsObject.displayName = ["displayName is required"];
            }

            var errorObject = {
                "message":"Argument Error",
                "fields": fieldsObject
            };

            deferred.reject(errorObject);
            return deferred.promise;
        }

        var config = {
            url: "http://localhost:8080/groups",
            method: "POST",
            data: groupObject
        };

        var httpPromise = $httpWithProtection(config);

        httpPromise.then(function(result) {
            deferred.resolve(result);
        }, function(error){
            deferred.reject(createServerErrorObject(error));
        });

        return deferred.promise;
	};

	fac.renameGroup = function(groupObject) {



        var config = {
            url: "http://localhost:8080/groups/"+groupObject.name,
            method: "PUT",
            data: groupObject
        };

        var httpPromise = $httpWithProtection(config);

        httpPromise.then(function(result) {
            deferred.resolve(result);
        }, function(error){
            deferred.reject(createServerErrorObject(error));
        });
		
		return deferred.promise;
	};

    function createServerErrorObject(error) {
        return {
            message: error.data.message,
            status: error.status,
            httpResponse: error.config
        };
    }

    function createArgumentErrorObject(arguments) {
        var fieldsObject = {};
        for (var argument of arguments) {
            fieldsObject[argument] = [argument + " is required"];
        }

        return {
            message: "Argument Error",
            fields: fieldsObject
        };
    }

    return fac;

});

},{}],4:[function(require,module,exports){
angular.module("contactServiceModule", ["authServiceModule"])

    .factory("contactService", function ($httpWithProtection, $q) {
        var contactServiceObject = {};

        contactServiceObject.getContact = function (groupId, contactId) {
            var deferred = $q.defer();

            var arguments = []

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contactId === "undefined") {
                arguments.push("contactId");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts/" + contactId,
                method: "GET"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.getContactByExample = function (groupId, contact) {
            var deferred = $q.defer();
            deferred.resolve([
                {
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "workEmail": "work@email.email",
                    "nickName": "nickName",
                    "jobTitle": "jobTitle",
                    "_links": {"self": {"href": "http://localhost/groups/name/contacts/1"}}
                },
                {
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "workEmail": "work@email.email",
                    "nickName": "nickName",
                    "jobTitle": "jobTitle",
                    "_links": {"self": {"href": "http://localhost/groups/name/contacts/2"}}
                }
            ]);
            return deferred.promise;
        };

        contactServiceObject.getContactsInGroup = function (groupId) {
            var deferred = $q.defer();

            if (typeof groupId === "undefined") {
                deferred.reject(createArgumentErrorObject(["groupId"]));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts",
                method: "GET"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.addContactToGroup = function (groupId, contact) {
            var deferred = $q.defer();

            var arguments = [];

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contact === "undefined") {
                arguments.push("contact");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts",
                method: "POST",
                data: contact
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.updateContact = function (groupId, contactId, contact) {
            var deferred = $q.defer();

            var arguments = [];

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contactId === "undefined") {
                arguments.push("contactId");
            }

            if (typeof contact === "undefined") {
                arguments.push("contact");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts/" + contactId,
                method: "PUT",
                data: contact
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve({});
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.deleteContact = function (groupId, contactId) {
            var deferred = $q.defer();

            var arguments = [];

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contactId === "undefined") {
                arguments.push("contactId");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts/" + contactId,
                method: "DELETE"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve({});
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.validateContact = function (contact) {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        function createArgumentErrorObject(arguments) {
            var fieldsObject = {};
            for (var argument of arguments) {
                fieldsObject[argument] = [argument + " is required"];
            }

            return {
                message: "Argument Error",
                fields: fieldsObject
            };
        }

        function createServerErrorObject(error) {
            return {
                message: error.data.message,
                status: error.status,
                httpResponse: error.config
            };
        }

        return contactServiceObject;
    });

},{}],5:[function(require,module,exports){
angular.module("userServiceModule", ["authServiceModule"])

.factory("userService", function (authService, $q) {
	
	var fac = {};
	
	fac.createUser = function(userName, password) {
		var deferred = $q.defer();
//		if (!userName || !password) {
			
			var newUser = { 
				"userName" : userName, 
				"password" : password, 
				"role" : "USER" 
			};
			deferred.resolve(newUser);
			
//		} else {
//			
//			var errorObj = {
//				"message": "MOCK Missing data",
//				"statusCode": 401,
//			};
//			deferred.reject(errorObj);
//			
//		}
		return deferred.promise;
	};
	
	fac.changeUserPassword = function(newPassword, oldPassword) {
		var userWithChangedPassword = { 
			"userName" : "userName", 
			"password" : null, 
			"role" : null 
		};
		var deferred = $q.defer();
		deferred.resolve(userWithChangedPassword);
		
		return deferred.promise;
	};
	
	fac.setRole = function(username, role) {
		var deferred = $q.defer();
		deferred.resolve();
		
		return deferred.promise;
	};

	fac.getUser = function() {
		var user = { 
			"userName" : "userName", 
			"password" : "password", 
			"role" : "ADMIN" 
		};
		
		var deferred = $q.defer();
		deferred.resolve(user);
		
		return deferred.promise;	
	};
	
	fac.getUsers = function() {
		var users = [{ 
			"userName" : "userName", 
			"password" : "password", 
			"role" : "ADMIN" 
		}, {
			"userName" : "userName2", 
			"password" : "password2", 
			"role" : "USER"	
		}];
		
		var deferred = $q.defer();
		deferred.resolve(users);
		
		return deferred.promise;	
	};
	
    return fac;
});

},{}]},{},[1]);
