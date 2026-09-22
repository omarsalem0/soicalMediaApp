"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("./../../common/service/validation.service");
const express_1 = require("express");
const auth_validation_1 = require("./auth.validation");
const auth_service_1 = require("./auth.service");
const success_ressponce_1 = require("../../common/Exceptions/success.ressponce");
const erorr_exception_1 = require("../../common/Exceptions/erorr.exception");
const router = (0, express_1.Router)();
router.post('/Multer', (0, validation_service_1.validation)(auth_validation_1.signUpSckema), async (req, res) => {
    console.log("done", req.body);
});
router.post('/sing-up', (0, validation_service_1.validation)(auth_validation_1.signUpSckema), async (req, res) => {
    let signUpUser = await auth_service_1.authService.signUp(req.body);
    (0, success_ressponce_1.successResponce)({
        res,
        message: 'user Added successfuly',
        data: signUpUser,
    });
});
router.post('/login', (0, validation_service_1.validation)(auth_validation_1.loginSckema), async (req, res) => {
    let loginUser = await auth_service_1.authService.login(req.body);
    (0, success_ressponce_1.successResponce)({
        res,
        message: 'user login successfuly',
        data: loginUser,
    });
});
router.post('/verify-account', async (req, res) => {
    let verfiyUser = await auth_service_1.authService.verifyAccount(req.body);
    (0, success_ressponce_1.successResponce)({ res, message: 'verify Account', data: verfiyUser });
});
router.get('/get_RefreshToken', async (req, res) => {
    let authorization = req.headers.authorization;
    if (!authorization)
        throw new erorr_exception_1.badRequestExxeption('Authorization header is required');
    let accessToken = await auth_service_1.authService.getAccessToken(authorization);
    (0, success_ressponce_1.successResponce)({ res, message: "genearate-AccessToken succesfuly", data: accessToken, status: 200 });
});
exports.default = router;
