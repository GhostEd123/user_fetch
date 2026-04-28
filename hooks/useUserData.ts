// import { useQuery } from '@tanstack/react-query';
// import { fetchUsers, fetchUserById } from '../utils/api';
import { useGetUsersQuery, useGetUserByIdQuery, User } from '../store/apiSlice';

export { User };

export const useFetchUsers = () => {
  /* OLD IMPLEMENTATION (TanStack)
  const { data: users = [], isLoading: loading, error, refetch } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  */

  const { data: users = [], isLoading: loading, error, refetch } = useGetUsersQuery();

  return { 
    users, 
    loading, 
    error: error ? (error as any).message || 'An error occurred' : null, 
    refetch 
  };
};



export const useFetchUserById = (id: string | string[] | undefined) => {
  /* OLD IMPLEMENTATION (TanStack)
  const { data: user = null, isLoading: loading, error, refetch } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id as string),
    enabled: !!id,
  });
  */

  const { data: user = null, isLoading: loading, error, refetch } = useGetUserByIdQuery(id as string, {
    // skip if id is not available, equivalent to TanStack's `enabled`
    skip: !id,
  });

  return { 
    user, 
    loading, 
    error: error ? (error as any).message || 'An error occurred' : null, 
    refetch 
  };
};
