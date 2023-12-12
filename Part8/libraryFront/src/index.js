import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client'
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createClient } from 'graphql-ws'

const cli = createClient({
  
})

const setAuthBearer = setContext((_, { headers }) => {
  let token = localStorage.getItem('usersessiontkn')
  return  {
    headers : {
      ...headers,
      Authorization: token ? `bearer:${token}` : null
    }
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthBearer.concat(link)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)