"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerEnum = exports.roleEnum = exports.genderEnum = void 0;
var genderEnum;
(function (genderEnum) {
    genderEnum[genderEnum["Male"] = 0] = "Male";
    genderEnum[genderEnum["Female"] = 1] = "Female";
})(genderEnum || (exports.genderEnum = genderEnum = {}));
var roleEnum;
(function (roleEnum) {
    roleEnum[roleEnum["Admin"] = 0] = "Admin";
    roleEnum[roleEnum["User"] = 1] = "User";
})(roleEnum || (exports.roleEnum = roleEnum = {}));
var providerEnum;
(function (providerEnum) {
    providerEnum[providerEnum["System"] = 0] = "System";
    providerEnum[providerEnum["Google"] = 1] = "Google";
})(providerEnum || (exports.providerEnum = providerEnum = {}));
