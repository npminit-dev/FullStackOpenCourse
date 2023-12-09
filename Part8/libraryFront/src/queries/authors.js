import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allauthors {
      name born booksCount
    }
  }
`

export const UPDATE_BORN = gql`
  mutation editAuthorBorn($name: String!, $setbornto: Int!) {
    editauthorborn(name: $name, setbornto: $setbornto) {
      name born booksCount
    }
  }
`