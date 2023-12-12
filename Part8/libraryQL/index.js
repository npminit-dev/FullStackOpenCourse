const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const uuid = require("uuid");
const Book = require("./mongodb/schemas/book");
const Author = require("./mongodb/schemas/author");
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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

const typeDefs = `
  type author {
    name: String!
    id: ID!
    born: Int
    booksCount: Int
  }

  type book {
    title: String!
    published: Int!
    author: author!
    id: ID!
    genres: [String!]!
  }

  type user {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    booksbygenre(genre: String): [book!]!
    getgenres: [String!]!
    allauthors: [author!]!
    allusers: [user!]!
    me: user
  }

  type Mutation {
    addauthor(name: String!, born: Int): [author!]!
    addbook(title: String!, published: Int!, author: String!, genres: [String!]!): book
    editauthorborn(name: String!, setbornto: Int!): author
    createuser(username: String!, favoriteGenre: String!): user
    login(username: String!, password: String!): token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    booksbygenre: async (_, args) => {
      if(!args.genre) return Book.find({}).populate('author')
      return Book.find({ genres: args.genre }).populate('author')
    },
    getgenres: async () => {
      let genres = new Set()
      let books = await Book.find({})
      books.forEach(book => book.genres.forEach(genre => genres.add(genre)))
      return [...genres]
    },
    allauthors: async () => Author.find({}),
    allusers: () => users,
    me: (_, __, context) => {
      return context.user
    }
  },

  author: {
    booksCount: async (root) => {
      return (await Book.find({ author: root._id })).length;
    },
  },

  Mutation: {
    addauthor: async (_, args) => {
      if (!args.name) throw new GraphQLError("NEW USERNAME NOT PROVIDED");
      if (args.name.length < 3) throw new GraphQLError("USERNAME TOO SHORT");
      let newAuthor = new Author({
        name: args.name,
        born: args?.born ? args.born : null,
      });
      try {
        await newAuthor.save();
        return Author.find({});
      } catch (err) {
        throw new GraphQLError(`ERROR SAVING USER: ${err}`);
      }
    },

    addbook: async (_, args, context) => {
      let user = context.user
      if(!user) throw new GraphQLError('TOKEN NOT FOUND')
      if (args.title.length < 4) throw new GraphQLError("BOOK TITLE TOO SHORT");
      let find = await Author.findOne({ name: args.author });
      if (!find) throw new GraphQLError("REFERENCED AUTHOR NOT FOUND");
      let newBook = new Book({ ...args, author: find._id });
      try {
        await newBook.save();
        return newBook
      } catch (err) {
        throw new GraphQLError(`ERROR SAVING BOOK: ${err}`);
      }
    },

    editauthorborn: async (_, args, context) => {
      let user = context.user
      if(!user) throw new GraphQLError('TOKEN NOT FOUND')
      let findAuthor = await Author.findOne({ name: args.name });
      if (!findAuthor) throw new GraphQLError("REFERENCED AUTHOR NOT FOUND");
      if (!args.setbornto) throw new GraphQLError("BORN DATE NOT PROVIDED");
      findAuthor.born = args.setbornto;
      try {
        return findAuthor.save();
      } catch (err) {
        throw new GraphQLError(`ERROR UPDATING AUTHOR: ${err}`);
      }
    },

    createuser: async (_, args) => {
      if (!args.username) throw new GraphQLError("NEW USERNAME NOT PROVIDED");
      let newUser = {
        username: args.username,
        favoriteGenre: args.favoriteGenre || null,
        id: uuid.v4(),
      };
      users.push(newUser);
      return newUser;
    },

    login: async (_, args) => {
      let findUser = users.find(
        user => user.username === args.username && args.password === "somepassword"
      )
      if (!findUser) return null;
      else {
        return {
          value: jwt.sign(
            JSON.stringify({
              username: findUser.username,
              password: "somepassword",
              favoriteGenre: findUser.favoriteGenre
            }), process.env.SECRET ),
        };
      }
    },
  },
};

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
