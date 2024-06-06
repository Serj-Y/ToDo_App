/* eslint-disable */
import axios from 'axios';
import { BaseUrl } from '../consts/baseUrl';
import { ACCESS_TOKEN, REFRESH_TOKEN, REQUEST_QUEUE } from '../consts/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

type TokenResponse = {
    refreshToken: string;
    accessToken: string;
};

let requestQueue: any[] = [];

const initializeRequestQueue = async () => {
    const storedQueue = await AsyncStorage.getItem(REQUEST_QUEUE);
    requestQueue = storedQueue ? JSON.parse(storedQueue) : [];
};

initializeRequestQueue();

export const baseApi = axios.create({
    baseURL: BaseUrl,
});

export const errorCatch = (error: any) =>
  error.response && error.response.data
    ? typeof error.response.data.message === 'object'
      ? error.response.data.message[0]
      : error.response.data.message
    : error.message;

export const getNewToken = async () => {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

    const response = await axios.put<TokenResponse>(`${BaseUrl}auth/access-token`, {
        refreshToken,
    });

    if (response.data.accessToken) {
        await AsyncStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
    }

    return response;
};

const INSTANCE_TIMEOUT = 1500;
const INSTANCE_HEADER = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true,
};

export const $api = axios.create({
    baseURL: BaseUrl,
    timeout: INSTANCE_TIMEOUT,
    headers: INSTANCE_HEADER,
});

$api.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const state = await NetInfo.fetch();
    if (!state.isConnected && config.method !== 'get') {
        requestQueue.push({
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers,
        });
        await AsyncStorage.setItem(REQUEST_QUEUE, JSON.stringify(requestQueue));
    }

    return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
      const originalRequest = error.config;
      if (
        (error.response?.status === 401 ||
          errorCatch(error) === 'jwt expired' ||
          errorCatch(error) === 'jwt must be provided') &&
        error.config &&
        !error.config._isRetry
      ) {
          originalRequest._isRetry = true;

          try {
              await getNewToken();
              return $api.request(originalRequest);
          } catch (err: any) {
              if (errorCatch(err) === 'jwt expired') {
                  await AsyncStorage.removeItem(ACCESS_TOKEN);
                  await AsyncStorage.removeItem(REFRESH_TOKEN);
              }
          }
      }
      throw error.response?.status;
  }
);

const retryRequests = async () => {
    if (requestQueue.length > 0) {
        while (requestQueue.length > 0) {
            const requestData = requestQueue.shift();
            try {
                await $api.request(requestData).then(() => {
                    AsyncStorage.setItem(REQUEST_QUEUE, JSON.stringify(requestQueue));
                });
            } catch (error) {
                console.error('Failed to retry request:', error);
            }
        }
    }
};

NetInfo.addEventListener((state) => {
    if (state.isConnected) {
        retryRequests();
    } else {
        console.log('Application is offline');
    }
});
