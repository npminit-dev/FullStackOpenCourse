import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './reduxstate/store'
import Root from './components/Root'
import AppContextProvider from './components/contexts/AppContextProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppContextProvider>
      <Root></Root>
    </AppContextProvider>
  </Provider>
)
