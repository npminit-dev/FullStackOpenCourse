import { useDispatch } from "react-redux";
import { addAnecdote, addAsync } from "../reducers/anecdoteReducer";
import { setmsg } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../utils/requests';

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    const content = e.target.anecdote.value
    e.preventDefault()
    dispatch(addAsync(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
