import { createQuery } from '@tanstack/svelte-query';
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

export const allRegisteredStudentCountQuery = createQuery({
  queryKey: ['users', 'count'],
  queryFn: async () => {
    return users.filter(user => user.role === 'student').length;
  }
})
