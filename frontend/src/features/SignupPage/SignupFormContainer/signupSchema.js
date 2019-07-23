import * as yup from "yup";

export const signupSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required field'),
    password: yup
        .string()
        .min(5, 'Password is too short')
        .required('Password is required field'),
});