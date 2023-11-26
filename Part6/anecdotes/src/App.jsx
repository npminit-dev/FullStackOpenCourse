import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAsync, setAll } from './reducers/anecdoteReducer'
import { createAnecdote, getAll } from './utils/requests'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(initializeAsync())
  }, [])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnectodeList></AnectodeList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App