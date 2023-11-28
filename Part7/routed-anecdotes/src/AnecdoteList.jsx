import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { appContext } from './AppContextProvider';

export const AnecdoteList = () => {

  const { anecdotes } = useContext(appContext)

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.content}
            <Link to={`anecdotes/${anecdote.id}`} state={anecdote}> -- ToDetails</Link>
          </li>
        ))}
      </ul>
      <Outlet></Outlet>
    </div>
  );
};
