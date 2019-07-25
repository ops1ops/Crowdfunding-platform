import * as yup from "yup";

export const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('First name is required field'),
    lastName: yup
        .string()
        .required('Last name is required field'),
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required field'),
    password: yup
        .string()
        .min(5, 'Password is too short')
        .required('Password is required field'),
    repeatPassword: yup
        .string()
        .min(5, 'Password is too short')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Repeat password is required field'),
});