const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const uuid = require("uuid");
const Book = require("./mongodb/schemas/book");
const Author = require("./mongodb/schemas/author");
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(`error connecting: ${err}`));

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
//  *
//  * Spanish:
//  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
//  * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
//  */

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "agile"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

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
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allbooks(author: String, genre: String): [book!]!
    allauthors: [author!]!
  }

  type Mutation {
    addauthor(name: String!, born: Int): [author!]!
    addbook(title: String!, published: Int!, author: String!, genres: [String!]!): [book!]!
    editauthorborn(name: String!, setbornto: Int!): author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allbooks: async () => Book.find({}),
    allauthors: async () => Author.find({}),
  },

  author: {
    booksCount: async (root) => {
      return Book.find({ author: root._id }).length;
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

    addbook: async (_, args) => {
      if(args.title.length < 4) throw new GraphQLError('BOOK TITLE TOO SHORT')
      let find = await Author.findOne({ name: args.author })
      if(!find) throw new GraphQLError('REFERENCED AUTHOR NOT FOUND')
      let newBook = new Book({ ...args, author: find._id })
      try {
        await newBook.save()
        return Book.find({})
      } catch(err) {
        throw new GraphQLError(`ERROR SAVING BOOK: ${err}`);
      }
    },

    editauthorborn: async (_, args) => {
      let findAuthor = await Author.findOne({ name: args.name })
      if(!findAuthor) throw new GraphQLError('REFERENCED AUTHOR NOT FOUND')
      if(!args.setbornto) throw new GraphQLError('BORN DATE NOT PROVIDED')
      findAuthor.born = args.setbornto
      try {
        return findAuthor.save()
      } catch(err) {
        throw new GraphQLError(`ERROR UPDATING AUTHOR: ${err}`)
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
