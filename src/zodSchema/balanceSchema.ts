import { z, TypeOf } from "zod";

export const balanceSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "id is important" })
      .min(3, "id must be 3 or more chars"),
    username: z
      .string({ required_error: "username is important" })
      .min(6, "username must be 6 or more chars"),
    password: z
      .string({ required_error: "password is important" })
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      ),
    balance: z
      .number({ required_error: "balance is important" })
      .min(1, "balance must be positive number"),
  }),
});

export type balanceType = TypeOf<typeof balanceSchema>["body"];
