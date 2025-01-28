import { z } from "zod";
import { contentTypes } from "../models/content.model";

export const authSchema = z.object({
  username: z.string().min(3, { message: "username should be min of 3" }).max(10, { message: "username should be max of 10" }),
  password: z.string().min(8, { message: "password should be min of 8" }).max(20, { message: "password should be max of 20" }),
})


export const contentSchema = z.object({
  link: z.string()
    .url({ message: "Must be a valid URL" })  // Validates URL format
    .min(3, { message: "Link should be min of 3" })
    .max(100, { message: "Link should be max of 100" }),

  type: z.enum(contentTypes, {
    errorMap: () => ({ message: "Invalid content type" })
  }),

  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title should be max of 100 characters" }),

  tags: z.array(
    z.string()
      .trim()
      .min(2, { message: "Tag must be at least 2 characters" })
      .max(20, { message: "Tag must be at most 20 characters" })
      .regex(/^[a-zA-Z0-9\s]+$/, {
        message: "Tags can only contain letters, numbers and spaces"
      })
  )
    .min(1, { message: "At least one tag is required" })
    .max(5, { message: "Maximum 5 tags allowed" })
});


export const shareSchema = z.object({
  share: z.boolean({
    required_error: "share field is required",
    invalid_type_error: "share field must be a boolean "
  })
});

export type ShareInput = z.infer<typeof shareSchema>;
