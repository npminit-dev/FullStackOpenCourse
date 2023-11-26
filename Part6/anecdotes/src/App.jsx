import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnectodeList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  
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