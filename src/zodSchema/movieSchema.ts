import { z, TypeOf } from "zod";



export const movieSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "ID is Required !" })
      .min(3, "id must be equal or more than 3 chars"),
    name: z
      .string({ required_error: "name is Required !" })
      .min(3, "name must be equal or more than 3 chars"),
    genre: z.enum(["drama", "action", "comedy"], {
      required_error: "genre must be one of these [drama , action , comedy]",
    }),
    rating: z
      .number({ required_error: "rating is Required !" })
      .min(1, "rating must be more than 0")
      .max(5, "rating must be less than or equal 5"),
    duration: z
      .number({ required_error: "duration is Required !" })
      .min(60, "duration must be more than 60 "),
  }),
});

export type movieType = TypeOf<typeof movieSchema>["body"];
