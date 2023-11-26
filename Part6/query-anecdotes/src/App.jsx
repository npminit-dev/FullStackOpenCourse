import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, upvoteAnecdote } from "./utils/requests";
import { useState } from 'react';

const App = () => {
  const queryClient = useQueryClient();

  const [message, setmessage] = useState('ready...');
  const query = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 5,
    retryDelay: 1000,
  });

  const mutation = useMutation({
    mutationFn: upvoteAnecdote,
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: () => {
      setmessage('Error upvoting!')
    }
  });

  const handleVote = (data) => {
    mutation.mutate({ id: data.id, votes: data.votes })
  };

  const anecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 0,
    },
  ];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={message}/>
      <AnecdoteForm />

      {query.data &&
        query.data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
