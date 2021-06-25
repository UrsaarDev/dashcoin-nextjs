import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/reducers/authReducer'

export default configureStore({
    reducer: {
        authReducer: authReducer
    }
})