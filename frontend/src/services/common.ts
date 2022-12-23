import axios from 'axios';

export const APIRoutes = {
    UPLOAD_DATA: 'upload-files',
    LOGIN: 'auth/login/',
};

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ApiInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
    },
});
