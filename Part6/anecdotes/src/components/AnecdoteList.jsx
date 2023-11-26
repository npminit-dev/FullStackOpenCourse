import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderByVotes, setmsg, voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderByVotes());
  }, []);

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(orderByVotes());
    dispatch(setmsg(`You upvoted the id: ${id} post!`))
  };

  return (
    <>
      {anecdotes
        .filter((anecdote) => {
          if (!filter || new RegExp(`${filter}`, "i").test(anecdote.content))
            return true;
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
