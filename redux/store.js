import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import productReducer from './reducers/productReducer'

export default configureStore({
    reducer: {
        authReducer: authReducer,
        productReducer: productReducer
    }
})