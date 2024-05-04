import * as Yup from "yup";



export const loginSchema = Yup.object({
    phone: Yup.string()
        .min(11, "Phone number must be exactly 11 digits")
        .max(11, "Phone number must be exactly 11 digits")
        .matches(/^\d+$/, "Phone number must contain only digits")
        .required("Please Enter Your Phone"),
    password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        
        .required("Please Enter Your Password")
});