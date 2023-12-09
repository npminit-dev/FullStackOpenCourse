import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query {
    allbooks {
      title author published
    }
}`

export const ADD_BOOK = gql`
  mutation Addbook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addbook(title: $title, published: $published, author: $author, genres: $genres) {
      title published author genres
    }
  }
`