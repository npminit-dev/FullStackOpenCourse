import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/books';
import { v4 } from 'uuid';

const Recomendations = ({ show, favgenre }) => {

  const books = useQuery(GET_BOOKS, { variables: { genre: favgenre }})

  if(!show) return null

  return ( 
    <>
      <h2>Your favorite genre: {favgenre}</h2>
      {
        books.loading ? 
        <div>Loading...</div> : books.error ? 
        <div>Error: {books.error.message}</div> :
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
          {
            books.data.booksbygenre.map(book => {
              return <tr key={v4()}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            })
          }
          </tbody>
        </table>
      }
    </>
  );
}
 
export default Recomendations;