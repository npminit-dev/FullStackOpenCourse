import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query($genre: String) {
    booksbygenre(genre: $genre) {
      title author {
        name
      } published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation Addbook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addbook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

export const GET_GENRES = gql`
  query {
    getgenres 
  }
`
