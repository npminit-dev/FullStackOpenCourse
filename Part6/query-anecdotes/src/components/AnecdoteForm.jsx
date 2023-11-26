import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../utils/requests'
import { useContext } from 'react'
import { notificationContext } from '../contexts/NotificationContextProvider'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { setmessage } = useContext(notificationContext)
  
  const mutation = useMutation({
    mutationFn: addAnecdote,
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: () => setmessage({ msg: 'Error adding anecdote!' })
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    mutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote'/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
