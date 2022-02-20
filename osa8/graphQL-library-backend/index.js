const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const User = require('./models/user')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const express = require('express')
const http = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  })

const start = async () => {

  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers});

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: httpServer,
      path: ''
    }
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            }
          }
        }
      }
    ]
  })

  await server.start();

  server.applyMiddleware({
    app,
    path: '/'
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}

start();