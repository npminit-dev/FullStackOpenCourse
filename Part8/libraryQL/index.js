const { ApolloServer } = require("@apollo/server");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const { users } = require('./mongodb/usersarray.js')
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const cors = require('cors')
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(`error connecting: ${err}`));

const app = express();
const httpServer = createServer(app)

const GraphQLSchema = makeExecutableSchema({typeDefs, resolvers})

const server = new ApolloServer({ schema: GraphQLSchema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const webSocketServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
})

const serverCleanup = useServer({ schema: GraphQLSchema }, webSocketServer);

(async () => {
  await server.start()

  app.use(
    "/graphql",
    express.json(),
    cors({origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:4000/graphql']}),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user = { user: null };
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("bearer:")
        ) {
          let token = req.headers.authorization.substring(7);
          try {
            token = jwt.verify(token, process.env.SECRET);
            let findUser = users.find(
              (user) =>
                user.username === token.username &&
                token.password === "somepassword"
            );
            if (!findUser) return user;
            user.user = findUser;
            return user;
          } catch (err) {
            throw new GraphQLError(`ERROR VERIFYING AUTH TOKEN: ${err}`);
          }
        } else return user;
      },
    })
  );

  const port = 4000

  httpServer.listen(port, () => {
    console.log(`server running at port ${port}`)
  })
})();

 





