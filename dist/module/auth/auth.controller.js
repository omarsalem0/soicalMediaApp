"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_service_1 = require("../../common/service/validation.service");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/Multer', (0, validation_service_1.validation)(auth_validation_1.signUpSckema), async (req, res) => {
    console.log("done", req.body);
});
exports.default = router;
