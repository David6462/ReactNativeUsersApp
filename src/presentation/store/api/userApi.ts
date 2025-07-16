import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserListItem } from '../../../domain/entities/User';
import DIContainer from '../../../shared/di/container';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserListItem[], void>({
      queryFn: async () => {
        try {
          const container = DIContainer.getInstance();
          const users = await container.getUsersUseCase.execute();
          return { data: users };
        } catch (error) {
          return { 
            error: { 
              status: 'FETCH_ERROR', 
              error: error instanceof Error ? error.message : 'Unknown error' 
            } 
          };
        }
      },
      providesTags: ['User'],
    }),
    
    getUserById: builder.query<User, string>({
      queryFn: async (id) => {
        try {
          const container = DIContainer.getInstance();
          const user = await container.getUserByIdUseCase.execute(id);
          return { data: user };
        } catch (error) {
          return { 
            error: { 
              status: 'FETCH_ERROR', 
              error: error instanceof Error ? error.message : 'Unknown error' 
            } 
          };
        }
      },
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    searchUsers: builder.query<UserListItem[], string>({
      queryFn: async (query) => {
        try {
          const container = DIContainer.getInstance();
          const users = await container.searchUsersUseCase.execute(query);
          return { data: users };
        } catch (error) {
          return { 
            error: { 
              status: 'FETCH_ERROR', 
              error: error instanceof Error ? error.message : 'Unknown error' 
            } 
          };
        }
      },
      providesTags: ['User'],
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useSearchUsersQuery,
  useLazySearchUsersQuery 
} = userApi;