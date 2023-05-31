import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/book-slice'
import authReducer from '../features/auth-slice'
import cartReducer from '../features/cart-slice'



const rootReducer = combineReducers({
  books: bookReducer,
  auth: authReducer,
  cart:cartReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools:true,
})