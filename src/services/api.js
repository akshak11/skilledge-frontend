import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5228/api'
});

export default api;