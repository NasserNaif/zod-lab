"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const zod_1 = require("zod");
exports.studentSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "id is important !" })
            .min(3, "id must be more or equal 3 chars !"),
        name: zod_1.z
            .string({ required_error: "name is important !" })
            .min(3, "name must be more or equal 3 chars !"),
        major: zod_1.z.enum(["CS", "IT", "IS", "SWE"], {
            required_error: "major must be one of these majors ( CS , IT , IS , SWE )",
        }),
        GPA: zod_1.z
            .number({ required_error: "GPA is important !" })
            .min(0, "GPA must be more or equal 0 !")
            .max(5, "GPA must be less or equal 5 !"),
        level: zod_1.z
            .number({ required_error: "level is important !" })
            .min(1, "level must be between 1 - 8 !")
            .max(8, "level must be between 1 - 8 !"),
    }),
});
