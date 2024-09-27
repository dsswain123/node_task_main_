import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    profilePicture: String
    numberOfOrders: Int
    createdAt: String
  }

  type Query {
    getUsers: [User]
  }
`;
