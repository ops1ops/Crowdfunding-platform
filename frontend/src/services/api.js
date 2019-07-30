import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('/api/auth', { credentials }).then(res => res.data),
        signup: userData => axios.post('/api/users', { userData }),
    },
    categories: {
        getAll: () => axios.get('/api/categories').then(res => res.data),
    },
    campaigns: {
        create: data => axios.post('/api/campaigns', { data }).then(res => res.data),
    },
};
