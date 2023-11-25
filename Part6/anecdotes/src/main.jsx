import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { default as reducers } from './reducers/anecdoteReducer'

const store = createStore(combineReducers({
  anecdotes: reducers.reducer,
  filter: reducers.filterReducer
}))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)