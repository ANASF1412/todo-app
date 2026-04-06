import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  age: z.union([
    z.coerce.number().positive("Age must be a positive number"),
    z.literal(""),
    z.undefined(),
  ]).optional(),
  year: z.string().optional(),
  department: z.string().optional(),
}).transform((data) => ({
  ...data,
  age: data.age && data.age !== "" ? Number(data.age) : undefined,
}));

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Invalid password"),
});

export const updateSchema = z.object({
  age: z.union([
    z.coerce.number().positive("Age must be a positive number"),
    z.literal(""),
    z.undefined(),
  ]).optional(),
  year: z.string().optional(),
  department: z.string().optional(),
}).transform((data) => ({
  ...data,
  age: data.age && data.age !== "" ? Number(data.age) : undefined,
}));
