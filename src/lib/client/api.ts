import axios from 'axios';
import { app } from '$lib/constants';

const axiosInstance = axios.create({
	baseURL: app.apiBaseUrl
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export { axiosInstance as api };
