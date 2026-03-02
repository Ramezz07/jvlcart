import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://13.217.224.102:8000'
});

export default instance;
