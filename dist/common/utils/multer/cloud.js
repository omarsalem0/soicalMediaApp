"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uplouds = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_enums_1 = require("../../enums/multer.enums");
const os_1 = require("os");
const uplouds = ({ storageKey = multer_enums_1.MulterEnums.memoryStorage }) => {
    try {
        const storage = storageKey == multer_enums_1.MulterEnums.memoryStorage ? multer_1.default.memoryStorage() : multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, (0, os_1.tmpdir)());
            },
            filename: function (req, file, cb) {
                let fileName = Date.now() + '-' + file.originalname;
                cb(null, fileName);
            }
        });
        return (0, multer_1.default)({ storage });
    }
    catch (error) {
        throw new Error('multer is error uploud', { cause: error });
    }
};
exports.uplouds = uplouds;
