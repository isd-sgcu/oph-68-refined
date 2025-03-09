import { createQuery } from '@tanstack/svelte-query';
import { api } from './api';
import { users } from '$lib/mock'

export const allUsersQuery = createQuery({
  queryKey: ['users'],
  queryFn: async () => {
    return users;
  },
})

export const studentsQuery = createQuery({
  queryKey: ['students'],
  queryFn: async () => {
    return users.filter(user => user.role === 'student');
  },
})

export const adminQuery = createQuery({
  queryKey: ['admin'],
  queryFn: async () => {
    return users.filter(user => user.role === 'admin');
  },
})
