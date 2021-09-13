import { combineReducers } from 'redux'


import LoginReducer from './LoginReducer'

const ReducerData = combineReducers({
    LoginReducer: LoginReducer
})

export default ReducerData