import * as yup from "yup";
import * as moment from 'moment'

const minDate = moment().add(7, 'd')._d;

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
    description: yup
        .string()
        .required('Required field'),
    expirationDate: yup
        .date()
        .min(minDate, 'Your campaign must last at least a week.')
        .required('Required field'),
});