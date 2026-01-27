/**
 * RTK Query API Configuration
 * 
 * Base API setup for RTK Query with base URL and endpoints
 */

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Base URL - will be configured via environment variables
const BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.crm.example.com/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
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
