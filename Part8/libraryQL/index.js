const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require('./typedefs')
const { resolvers } = require('./resolvers')
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PubSub } = require('graphql-subscriptions');
const { expressMiddleware } = require('@apollo/server/express4')
const express = require('express')

const pubsub = new PubSub()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(`error connecting: ${err}`));

let users = [
  {
    username: "Jorge Balsamo",
    favoriteGenre: "Suspense",
  },
  {
    username: "Nicholas Cage",
    favoriteGenre: "Drama",
  },
];


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    let user = { user: null }
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("bearer:")
    ) {
      let token = req.headers.authorization.substring(7)
      try {
        token = jwt.verify(token, process.env.SECRET)
        let findUser = users.find(
          (user) => user.username === token.username && token.password === "somepassword"
        );
        if (!findUser) return user
        user.user = findUser
        return user
      } catch (err) {
        throw new GraphQLError(`ERROR VERIFYING AUTH TOKEN: ${err}`)
      }
    } else return user
  },
})
  .then((connection) => {
    console.log(`Server ready at ${connection.url}`)
})
