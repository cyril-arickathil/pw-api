import { z } from "zod";

export const AddContactResponseSchema = z.object({
  _id: z.string(),
  firstName: z.string().max(2),
  lastName: z.string(),
  email: z.string(),
  owner: z.string(),
  __v: z.number(),
});

export const AddContactRequestSchema = z.object({
  firstName: z.string().nonempty("First name is required"), // Ensures it's a non-empty string
  lastName: z.string().nonempty("Last name is required"), // Ensures it's a non-empty string
  email: z.string().email("Invalid email address"), // Validates email format
  location: z.object({
    city: z.string().nonempty("City is required"), // Ensures city is a non-empty string
    country: z.string().nonempty("Country is required"), // Ensures country is a non-empty string
  }),
  employer: z.object({
    jobTitle: z.string().nonempty("Job title is required"), // Ensures job title is a non-empty string
    company: z.number(), // Ensures company is a non-empty string
  }),
});
