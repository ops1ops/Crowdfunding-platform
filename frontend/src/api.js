import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios
                .post('/api/auth')
                .then(res => res.data.user)
                .catch(err => err.message),
    },
};
