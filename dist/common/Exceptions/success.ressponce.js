"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesResponc = void 0;
const succesResponc = ({ res, message = "Success", status = 200, data, }) => {
    return res.status(status).json({
        message,
        data
    });
};
exports.succesResponc = succesResponc;
