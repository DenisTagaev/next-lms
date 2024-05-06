import * as zod from "zod"

const formSchema = zod.object({
    title: zod.string().min(1, {
        message: "Title is required", 
    })
})

export { formSchema } ;