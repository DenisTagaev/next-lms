import * as zod from "zod"

export const formTitleSchema = zod.object({
  title: zod.string().min(1, {
      message: "Title is required", 
  })
});

export const formDescriptionSchema = zod.object({
  description: zod.string().min(1, {
      message: "Description is required",
  })
});

export const formImageSchema = zod.object({
  imageUrl: zod.string().min(1, {
      message: "Image is required",
  })
});

export const formCategorySchema = zod.object({
  categoryId: zod.string().min(1, {
    message: "Category selection is required",
  })
});

export const formPriceSchema = zod.object({
  price: zod.coerce.number()
});

export const formAttachmentSchema = zod.object({
  url: zod.string().min(1)
});

export const formChapterSchema = zod.object({
  title: zod.string().min(1)
});

export const formAccessSchema = zod.object({
  isFree: zod.boolean().default(false)
});

export const formVideoSchema = zod.object({
  videoUrl: zod.string().min(1)
});