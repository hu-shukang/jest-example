import axios from 'axios';

const axiosClient = axios.create({ baseURL: 'https://example.com/api' });

export const HTTP = axiosClient;
