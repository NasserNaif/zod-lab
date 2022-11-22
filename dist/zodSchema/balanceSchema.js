"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceSchema = void 0;
const zod_1 = require("zod");
exports.balanceSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "id is important" })
            .min(3, "id must be 3 or more chars"),
        username: zod_1.z
            .string({ required_error: "username is important" })
            .min(6, "username must be 6 or more chars"),
        password: zod_1.z
            .string({ required_error: "password is important" })
            .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
            .regex(new RegExp(".*[a-z].*"), "One lowercase character")
            .regex(new RegExp(".*\\d.*"), "One number")
            .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
        balance: zod_1.z
            .number({ required_error: "balance is important" })
            .min(1, "balance must be positive number"),
    }),
});
