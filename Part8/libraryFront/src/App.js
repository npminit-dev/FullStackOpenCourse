import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Session from './components/Session'
import Recomendations from './components/Recomendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setuser] = useState(null)
  const [genre, setgenre] = useState(null)

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { user && 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recomendations')}>recomendations</button>
          </>
        }
        <button onClick={() => setPage('session')}>session</button>
        
      </div>
      <Authors user={user} show={page === 'authors'} />
      <Books show={page === 'books'} genre={genre} setgenre={setgenre}/>
      <NewBook show={page === 'add'} actualGenre={genre} />
      <Session user={user} setuser={setuser} show={page === 'session'} />
      {user && <Recomendations show={page === 'recomendations'} favgenre={user.favoriteGenre}></Recomendations>}
    </div>
  )
}

export default App
