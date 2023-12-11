import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import { setContext } from "@apollo/client/link/context"

const setAuthBearer = setContext((_, { headers }) => {
  let token = localStorage.getItem('usersessiontkn')
  return  {
    headers : {
      ...headers,
      Authorization: token ? `bearer:${token}` : null
    }
  }
});

const link = new HttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthBearer.concat(link)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)