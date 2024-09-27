import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/schema.js'; 
import { resolvers } from '../../graphql/resolvers.js'; 
import connectDB from '../../utils/db.js'; 


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Configure the API route
export const config = {
  api: {
    bodyParser: false, 
  },
};

// Export the API handler
export default async function handler(req, res) {
  // Connect to MongoDB before handling the request
  await connectDB();
  
  // Create and handle the request using ApolloServer
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
