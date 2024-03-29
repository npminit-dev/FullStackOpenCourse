import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, GET_BOOKS, GET_GENRES } from '../queries/books'
import { ALL_AUTHORS } from '../queries/authors';
import { loadErrorMessages } from "@apollo/client/dev";

loadErrorMessages()

const NewBook = ({ show, actualGenre }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addbook, { error } ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: GET_GENRES }],
    update: (cache, response) => {
      genres.concat(null).forEach(genre => {
        cache.updateQuery({ query: GET_BOOKS, variables: { genre }}, data => 
          data?.booksbygenre && data?.booksbygenre ? 
          { booksbygenre: data.booksbygenre.concat(response.data) } : response.data
        )
      })
    },
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addbook({ variables: { title, author, published: parseInt(published), genres } })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
      { error && <div>Error fetching the book: { error.message }</div> }
    </div>
  )
}

export default NewBook