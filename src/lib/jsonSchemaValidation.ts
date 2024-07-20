import { z } from "zod";

const blockSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "image", "list", "button"]),
  text: z.string().optional(),
  color: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  alt: z.string().optional(),
  src: z.string().optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        src: z.string(),
      }),
    )
    .optional(),
  bgColor: z.string().optional(),
});

const pageSchema = z.object({
  id: z.string(),
  blocks: z.array(blockSchema),
});

export const jsonSchemaValidation = z.object({
  name: z.string(),
  bgColor: z.string(),
  pages: z.array(pageSchema).min(1),
});
