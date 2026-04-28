import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}


export const userApi = createApi({
  reducerPath: 'userApi',
  // fetchBaseQuery is a lightweight wrapper around fetch()
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    // Fetches all users. Returns an array of User objects.
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
    // Fetches a single user by ID.
    getUserById: builder.query<User, string | number>({
      query: (id) => `/users/${id}`,
    }),
  }),
});


export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
