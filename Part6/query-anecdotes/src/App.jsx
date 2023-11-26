import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, upvoteAnecdote } from "./utils/requests";
import { notificationContext } from "./contexts/NotificationContextProvider";
import { useContext } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const { setmessage } = useContext(notificationContext);

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
      setmessage({ msg: "Error upvoting!" });
    },
  });

  const handleVote = (data) => {
    mutation.mutate({ id: data.id, votes: data.votes });
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
        <hr></hr>
      <Notification />
    </div>
  );
};

export default App;
