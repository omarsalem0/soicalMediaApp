"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSckema = void 0;
const zod_1 = require("zod");
exports.signUpSckema = {
    body: zod_1.z.strictObject({
        userName: zod_1.z.string(),
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6, { error: 'password must be at least 6 charcters' }),
        confirmPassword: zod_1.z.string(),
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({ code: 'custom', message: 'password is not matched' });
        }
    })
};
