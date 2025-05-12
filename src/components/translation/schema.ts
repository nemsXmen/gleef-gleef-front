import { z } from "zod";

export const TranslationSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  description: z.string().optional(),
  translations: z.record(
    z.string().min(1, { message: "Language code is required" }), 
    z.string().min(1, { message: "Value is required" })           
  )
});


export const UpsertTranslationFormSchema = z.object({
    projectId: z.number().int().min(1, { message: "ProjectId is required" }),
    translations: z.array(TranslationSchema),
});

export type UpsertTranslationForm = z.infer<typeof UpsertTranslationFormSchema>;