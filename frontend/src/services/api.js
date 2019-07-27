import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('/api/auth', {credentials}).then((res) => res.data),
        signup: userData =>
            axios.post('/api/users', {userData}),
    },
    youtube: {
        isValid: id =>
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id&id=${id}&key=AIzaSyD58g0rLpIuq7uVIl5Q7OgdjRgfrgVlONc`),
    }
};
