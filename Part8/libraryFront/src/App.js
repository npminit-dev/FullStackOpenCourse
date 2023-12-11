import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Session from './components/Session'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setuser] = useState(null)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { user && 
          <button onClick={() => setPage('add')}>add book</button>
        }
        <button onClick={() => setPage('session')}>session</button>
      </div>
      <Authors user={user} show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Session user={user} setuser={setuser} show={page === 'session'} />
    </div>
  )
}

export default App
