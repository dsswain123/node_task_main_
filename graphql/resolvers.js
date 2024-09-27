import { getUserAggregations } from '../services/userService.js';

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await getUserAggregations();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  },
};
