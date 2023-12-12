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

  type Subscription {
    addedbook: book
  }
`;

module.exports = {
  typeDefs
}