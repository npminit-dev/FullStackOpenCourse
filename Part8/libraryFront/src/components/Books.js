import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/books'
import { v4 } from 'uuid'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)

  if(!props.show) return null
  
  return (
    <>
      <h2>Books</h2>
      {
        books.loading ? 
        <div>LOADING BOOKS...</div> :
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allbooks.map((a) => (
              <tr key={v4()}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default Books
