"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalHandelError = void 0;
const globalHandelError = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        messsage: err.messsage,
        stack: err.stack,
        cause: err.cause,
        err
    });
};
exports.globalHandelError = globalHandelError;
