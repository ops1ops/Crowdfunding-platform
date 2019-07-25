import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('/api/auth', {credentials}),
        signup: userData =>
            axios.post('/api/users', {userData}),
    }
};
