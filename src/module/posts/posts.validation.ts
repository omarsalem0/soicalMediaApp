import { z } from "zod"

export const postsValidation = z.strictObject({
    title: z
        .string()
        .min(3, { error: "title must be at least 3 characters" })
        .max(100, { error: "title must be less than 100 characters" }),

    content: z
        .string()
        .min(5, { error: "content must be at least 5 characters" })
        .max(5000, { error: "content must be less than 5000 characters" })
        .trim()
})