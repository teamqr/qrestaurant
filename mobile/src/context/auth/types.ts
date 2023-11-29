import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInResponseSchema = z.object({
  token: z.string(),
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string().min(3),
  lastname: z.string().min(3),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
