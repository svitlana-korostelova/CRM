/**
 * RTK Query API Configuration
 *
 * Base API setup for RTK Query with base URL and endpoints
 */

import {Platform} from 'react-native';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Base URL - Android emulator uses 10.0.2.2 to reach host localhost; iOS Simulator uses localhost
const getBackendHost = () =>
  __DEV__
    ? Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000'
    : 'https://api.crm.example.com';

export const BASE_URL = getBackendHost() + '/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      // Add auth token if available
      // const token = (getState() as RootState).auth.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ['Client', 'Deal', 'Task'],
  endpoints: () => ({}),
});
