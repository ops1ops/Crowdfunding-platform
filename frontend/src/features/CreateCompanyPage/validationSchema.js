import * as yup from "yup";

export const validationSchema = yup.object({
    title: yup
        .string()
        .max(60, 'Too long')
        .required('Required field'),
    link: yup
        .string()
        .matches(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/, 'Invalid link')
        .required('Required field'),
    goalAmount: yup
        .number()
        .positive('Goal amount should be positive number')
        .required('Required field')
        .typeError('Goal amount should be a number'),
});