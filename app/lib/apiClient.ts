import axios from 'axios';

import { API_BASE_URL, SESSION_ID_KEY } from './constants';

const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use(
  async (request) => {
    const sessionId = localStorage.getItem(SESSION_ID_KEY);

    console.log('Session ID: ', sessionId);

    if (sessionId) {
      request.headers['x-session-id'] = sessionId;
    }

    console.log('Headers: ', request.headers);

    console.log(`REQUEST (v1): ${request.method?.toUpperCase()} ${request.baseURL}${request.url}`);

    return request;
  },
  (error) => {
    Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`RESPONSE (v1): ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    // Reject the promise with the structured error
    return Promise.reject(error);
  },
);

export default apiClient;
