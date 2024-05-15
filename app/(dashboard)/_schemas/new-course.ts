import * as zod from "zod"

const formTitleSchema = zod.object({
  title: zod.string().min(1, {
      message: "Title is required", 
  })
});

const formDescriptionSchema = zod.object({
  description: zod.string().min(1, {
      message: "Description is required",
  })
});

const formImageSchema = zod.object({
  imageUrl: zod.string().min(1, {
      message: "Image is required",
  })
});

const formCategorySchema = zod.object({
  categoryId: zod.string().min(1, {
    message: "Category selection is required",
  })
});

const formPriceSchema = zod.object({
  price: zod.coerce.number()
});

const formAttachmentSchema = zod.object({
  url: zod.string().min(1)
});

const formChapterSchema = zod.object({
  title: zod.string().min(1)
});

const formAccessSchema = zod.object({
  isFree: zod.boolean().default(false)
});

const formVideoSchema = zod.object({
  videoUrl: zod.string().min(1)
});

export { 
  formTitleSchema, 
  formDescriptionSchema, 
  formImageSchema, 
  formCategorySchema, 
  formPriceSchema, 
  formAttachmentSchema, 
  formChapterSchema,
  formAccessSchema,
  formVideoSchema
} ;