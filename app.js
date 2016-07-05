require("contactService");
require("authService");

angular.module("myapp", ["contactServiceModule"])

.controller("appCtrl", function(contactService){
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