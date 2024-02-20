import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define base URL for your backend API
const baseUrl = 'http://localhost:8080/users';

// Define an API slice using createApi
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Define endpoints for fetching users, creating a user, updating a user, and deleting a user
    getUsers: builder.query({
      query: () => '/getusers',
    }),
    getUserById: builder.query({
      query: (userId) => `/getusers/${userId}`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/createuser',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/updateuser/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteuser/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = apiSlice;
