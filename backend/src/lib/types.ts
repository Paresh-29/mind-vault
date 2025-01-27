import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3, { message: "username should be min of 3" }).max(10, { message: "username should be max of 10" }),
  password: z.string().min(8, { message: "password should be min of 8" }).max(20, { message: "password should be max of 20" }),
})
