import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setmsg } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.note.value))
    dispatch(setmsg('Note added!'))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="note" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
