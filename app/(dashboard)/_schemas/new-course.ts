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
    }),
});

const formCategorySchema = zod.object({
  categoryId: zod.string().min(1, {
    message: "Category selection is required",
  }),
});

export { formTitleSchema, formDescriptionSchema, formImageSchema, formCategorySchema } ;