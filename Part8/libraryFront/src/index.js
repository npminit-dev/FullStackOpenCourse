import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client'
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws'


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
  uri: 'http://localhost:4000/'
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/'
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  setAuthBearer.concat(httpLink),
  setAuthBearer.concat(wsLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)