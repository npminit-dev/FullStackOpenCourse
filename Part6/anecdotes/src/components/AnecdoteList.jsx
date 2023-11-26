import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderByVotes, setmsg, voteAnecdote, voteAsync } from "../reducers/anecdoteReducer";
import { v4 } from 'uuid';

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderByVotes());
  }, []);

  const handleVote = (id, votes) => {
    dispatch(voteAsync(id, votes))
  };

  return (
    <>
      {anecdotes
        .filter((anecdote) => {
          if (!filter || new RegExp(`${filter}`, "i").test(anecdote.content))
            return true;
        })
        .map((anecdote) => (
          <div key={v4()}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id, anecdote.votes)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
