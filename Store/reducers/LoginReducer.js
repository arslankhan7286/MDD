import React, { Component ,useState} from 'react';
import { AuthActionTypes } from '../actionTypes'

const {
   LOGIN_START,
   LOGIN_SUCCESS,
   LOGIN_FAIL
} = AuthActionTypes

  let INITIAL_STATE ={
      data:[],
      isLoading: true,

  }
  const LoginReducer=(state=INITIAL_STATE, action)=>
  {
      switch(action.type){

        case LOGIN_START:{
            return {
                ...state,
                isLoading:true,
               
            }
        }

        case LOGIN_FAIL:{
            return {
                ...state,
                isLoading:false
            }
        }

        case LOGIN_SUCCESS:{
            return {
                isLoading:false,
                data:action.payload
            }
        }

        default:
            return state
      }
  }
  export default LoginReducer;