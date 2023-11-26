import { configureStore } from '@reduxjs/toolkit'
import reds from './reducers/anecdoteReducer'

export default configureStore({
  reducer: {
    anecdotes: reds.anecdotesRedcr,
    filter: reds.filterRedcr,
    notification: reds.notificationRedcr
  }
})