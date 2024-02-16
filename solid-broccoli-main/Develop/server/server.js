const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const express = require('express');
const { authMiddleware } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, 
});


server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}${server.graphqlPath}`);
});

