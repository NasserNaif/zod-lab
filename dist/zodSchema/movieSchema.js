"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const zod_1 = require("zod");
exports.movieSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "ID is Required !" })
            .min(3, "id must be equal or more than 3 chars"),
        name: zod_1.z
            .string({ required_error: "name is Required !" })
            .min(3, "name must be equal or more than 3 chars"),
        genre: zod_1.z.enum(["drama", "action", "comedy"], {
            required_error: "genre must be one of these [drama , action , comedy]",
        }),
        rating: zod_1.z
            .number({ required_error: "rating is Required !" })
            .min(1, "rating must be more than 0")
            .max(5, "rating must be less than or equal 5"),
        duration: zod_1.z
            .number({ required_error: "duration is Required !" })
            .min(60, "duration must be more than 60 "),
    }),
});
