"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const erorr_exception_1 = require("../Exceptions/erorr.exception");
const validation = (sckema) => {
    return (req, res, next) => {
        let validationError = [];
        for (const key of Object.keys(sckema)) {
            if (!sckema[key]) {
                throw new erorr_exception_1.badRequestExxeption('validation key of sckem dosnot exsist');
            }
            let value = sckema[key].safeParse(req[key]);
            if (!value.success) {
                validationError.push({
                    key,
                    issue: value.error.issues
                });
            }
            if (validationError.length > 0) {
                throw new erorr_exception_1.badRequestExxeption('validation error', validationError);
            }
        }
        next();
    };
};
exports.validation = validation;
