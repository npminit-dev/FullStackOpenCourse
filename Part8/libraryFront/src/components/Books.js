import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_BOOKS } from '../queries/books'
import { v4 } from 'uuid'
import Filters from './Filters'

const Books = ({ show, genre, setgenre }) => {
  const [getbooks, { called, loading, data }] = useLazyQuery(GET_BOOKS)

  useEffect(() => {
    getbooks({ variables: { genre:genre }})
  }, [genre])

  if(!show) return null
  
  return (
    <>
      <h2>Books</h2>
      <Filters 
        setgenre={setgenre}
      ></Filters>
      {
        loading ? 
        <div>LOADING BOOKS...</div> :
        <>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              {data.booksbygenre.map((a) => 
                <tr key={v4()}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      }
    </>
  )
}

export default Books
