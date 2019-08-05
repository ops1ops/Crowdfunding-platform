import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('/api/auth', { credentials }).then(res => res.data),
        signup: userData => axios.post('/api/users', { userData }),
        getById: id => axios.get(`/api/user/${id}`).then(res => res.data),
    },
    categories: {
        getAll: () => axios.get('/api/categories').then(res => res.data),
    },
    campaigns: {
        delete: id => axios.delete(`/api/campaign/${id}`).then(res => res.data),
        getById: data => axios.get(`/api/campaign/${data.id}/user/${data.userId}`).then(res => res.data),
        update: data => axios.put(`/api/campaign/${data.id}`, { data }).then(res => res.data),
        create: data => axios.post('/api/campaigns', { data }).then(res => res.data),
        supportCampaign: data => axios.post(`/api/campaign/${data.id}/support`, { data }).then(res => res.data),
        rateCampaign: data => axios.post(`/api/campaign/${data.id}/rate`, { data }).then(res => res.data),
    },
    rewards: {
        delete: data => axios.delete(`/api/campaign/${data.id}/reward/${data.rewardId}`).then(res => res.data),
        update: data => axios.put(`/api/campaign/${data.id}/reward/${data.rewardId}`, { data }).then(res => res.data),
        getAllByCampaign: id => axios.get(`/api/campaign/${id}/rewards`).then(res => res.data.rewards),
        create: data => axios.post(`/api/campaign/${data.id}/rewards`, { data }).then(res => res.data.reward),
    },
    comments: {
        getAll: data => axios.get(`/api/campaign/${data.id}/user/${data.userId}/comments`).then(res => res.data),
        likeComment: data => axios.post(`/api/campaign/${data.id}/comment/${data.commentId}`, { data }).then(res => res.data),
    }
};
