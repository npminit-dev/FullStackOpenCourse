import { useDispatch } from "react-redux";
import { addNewNote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addNewNote(e.target.note.value))
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
