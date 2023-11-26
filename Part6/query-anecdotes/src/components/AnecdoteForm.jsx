import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../utils/requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: addAnecdote,
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    mutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' pattern='.{5,}' required/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
