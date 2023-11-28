import { Menu } from './Menu'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import Notification from './Notification'
import AppContextProvider from './AppContextProvider'

const App = () => {

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AppContextProvider>
        <Notification />
        <Outlet />
      </AppContextProvider>
      <Footer />
    </div>
  )
}

export default App
