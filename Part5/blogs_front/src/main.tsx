import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Users from './components/users/Users'
import User from './components/users/User'
import { Provider } from 'react-redux'
import { store } from './reduxstate/store'
import Blogs from './components/Blogs'
import Root from './components/Root'
import AppContextProvider from './components/contexts/AppContextProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppContextProvider>
      <Root></Root>
    </AppContextProvider>
  </Provider>
)
