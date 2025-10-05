import z from "zod";

export const signupShcmea = z.object({
  fullName: z
    .string()
    .min(3, "name cannot be smaller than 3")
    .max(20, "fullName cannot be greater than 20"),
  email: z.email(),
  password: z.string().min(6, "password cannot be smaller than 6"),
});
export const loginShcmea = z.object({
  email: z.email(),
  password: z.string().min(6, "password cannot be smaller than 6"),
});
