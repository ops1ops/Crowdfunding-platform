import * as yup from "yup";

export const validationSchema = yup.object({
    name: yup
        .string()
        .required('Required field'),
    description: yup
        .string()
        .min(5, 'Description is too short')
        .required('Required field'),
    amount: yup
        .number()
        .truncate(2)
        .positive('Pledge amount should be positive number')
        .required('Required field')
        .typeError('Pledge amount should be a number'),
});