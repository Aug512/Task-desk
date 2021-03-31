import { combineReducers } from 'redux'
import userDataReducer from './userDataReducer'

// import reducer from '../reducer'

export const rootReducer = combineReducers({
  userData: userDataReducer,
  // main: reducer,
})

export type RootState = ReturnType<typeof rootReducer>
