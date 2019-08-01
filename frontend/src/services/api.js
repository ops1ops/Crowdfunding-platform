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
        delete: id => axios.delete(`/api/campaign/${id}`).then(res => res.data),
        getById: id => axios.get(`/api/campaign/${id}`).then(res => res.data.campaign),
        update: data => axios.put(`/api/campaign/${data.id}`, { data }).then(res => res.data),
        create: data => axios.post('/api/campaigns', { data }).then(res => res.data),
    },
    rewards: {
        create: data => axios.post(`/api/campaign/${data.id}/rewards`, { data }).then(res => res.data),
    }
};
