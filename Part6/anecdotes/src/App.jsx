import { useSelector, useDispatch } from 'react-redux'
import { voteNote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <AnectodeList></AnectodeList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App