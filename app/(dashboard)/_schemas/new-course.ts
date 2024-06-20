import * as zod from "zod"
const allowedCharactersRegex = /^[a-zA-Z0-9\s.,'!?:"-]+$/;

const disallowedPatterns = [
  /<script.*?>.*?<\/script.*?>/gi, // Prevent script tags
  /<.*?on\w+.*?=.*?>/gi, // Prevent HTML event handlers
  /eval\(.*?\)/gi, // Prevent eval() calls
  /javascript:/gi, // Prevent javascript: URLs
  /vbscript:/gi, // Prevent vbscript: URLs
  /data:/gi, // Prevent data: URLs
  /<.*?iframe.*?>/gi, // Prevent iframe tags
  /<.*?form.*?>/gi, // Prevent form tags
  /<.*?input.*?>/gi, // Prevent input tags
  /<.*?style.*?>/gi, // Prevent style tags
  /alert\(.*?\)/gi, // Prevent alert() calls
  /<.*?object.*?>/gi, // Prevent object tags
  /<.*?embed.*?>/gi, // Prevent embed tags
  /<.*?link.*?>/gi, // Prevent link tags
  /union.*?select/gi, // Prevent SQL injection attempts
  /select.*?from/gi, // Prevent SQL injection attempts
  /insert.*?into/gi, // Prevent SQL injection attempts
  /drop.*?table/gi, // Prevent SQL injection attempts
  /--/gi, // Prevent SQL comment delimiters
  /\.\.\//gi, // Prevent directory traversal
  /<.*?meta.*?>/gi, // Prevent meta tags
  /<.*?svg.*?>/gi, // Prevent SVG tags
  /<.*?base.*?>/gi, // Prevent base tags
  /<.*?xml.*?>/gi, // Prevent XML tags
  /document\./gi, // Prevent access to document object
  /window\./gi, // Prevent access to window object
  /location\./gi, // Prevent access to location object
];

export const formTitleSchema = zod.object({
  title: zod
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title has to be less than 100 characters" })
    .regex(allowedCharactersRegex, {
      message:
        "Title contains invalid characters. Only alphanumeric characters, spaces, and basic punctuation are allowed.",
    })
    .refine(
      (value) => !disallowedPatterns.some((pattern) => pattern.test(value)),
      {
        message: "Title contains disallowed content.",
      }
    ),
});

export const formDescriptionSchema = zod.object({
  description: zod
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .regex(allowedCharactersRegex, {
      message:
        "Description contains invalid characters. Only alphanumeric characters, spaces, and basic punctuation are allowed.",
    })
    .refine(
      (value) => !disallowedPatterns.some((pattern) => pattern.test(value)),
      {
        message: "Description contains disallowed content.",
      }
    ),
});

export const chDescriptionSchema = zod.object({
  description: zod
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .refine((value) => {
    const textContent = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return textContent.length > 0;
  }, { message: "Description must contain at least one non-whitespace character" })
});

export const formImageSchema = zod.object({
  imageUrl: zod
    .string()
    .trim()
    .min(1, { message: "Image is required" })
    .regex(allowedCharactersRegex, {
      message:
        "Image url contains invalid characters. Only alphanumeric characters, spaces, and basic punctuation are allowed.",
    })
    .refine(
      (value) => !disallowedPatterns.some((pattern) => pattern.test(value)),
      {
        message: "Image url contains disallowed content.",
      }
    ),
});

export const formCategorySchema = zod.object({
  categoryId: zod
    .string()
    .trim()
    .min(1, { message: "Selection is required" }),
});

export const formPriceSchema = zod.object({
  price: zod
    .coerce
    .number()
    .min(0, { message: "Price must be non-negative" }) 
    .max(1000000, { message: "Price must be less than 1,000,000" }) 
    .refine((value) => !isNaN(value), {
      message: "Price has to be a valid number",
    }), 
});

export const formAttachmentSchema = zod.object({
  url: zod
    .string()
    .trim()
    .min(1, { message: "You have to add at least 1 file" }) 
});

export const formChapterSchema = zod.object({
  title: zod
    .string()
    .trim()
    .min(1, { message: "Chapter name is required" })
    .regex(allowedCharactersRegex, {
      message:
        "Chapter name contains invalid characters. Only alphanumeric characters, spaces, and basic punctuation are allowed.",
    })
    .refine(
      (value) => !disallowedPatterns.some((pattern) => pattern.test(value)),
      {
        message: "Chapter name contains disallowed content.",
      }
    ),
});

export const formAccessSchema = zod.object({
  isFree: zod
    .boolean()
    .default(false)
    .refine((value) => typeof value === "boolean", {
      message: "Checkbox has to contain a boolean value",
    }),
});

export const formVideoSchema = zod.object({
  videoUrl: zod
    .string()
    .min(1, { message: "Video is required" })
    .regex(allowedCharactersRegex, {
      message:
        "Video url contains invalid characters. Only alphanumeric characters, spaces, and basic punctuation are allowed.",
    })
    .refine(
      (value) => !disallowedPatterns.some((pattern) => pattern.test(value)),
      {
        message: "Video url contains disallowed content.",
      }
    ),
});