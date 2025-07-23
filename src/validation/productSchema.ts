import * as yup from "yup";

export const productValidationSchema = yup.object({
  productName: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  availableQuantity: yup
    .number()
    .positive("Must be positive")
    .required("Available quantity is required"),
  unit: yup
    .string()
    .oneOf(["kg", "liter", "ton"], "Invalid unit")
    .required("Unit is required"),

  unitPrice: yup
    .number()
    .min(0, "Unit price must be a positive number")
    .required("Unit price is required"),
  productLocation: yup.string().required("Product location is required"),
  image: yup.mixed().required("Image is required"),
  description: yup.string()
});
