import axios from 'axios'
import { AuthActionTypes } from '../actionTypes'


const {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} = AuthActionTypes

export const fetchUsers = ({ username, password }) => {
  // insert Whole
  // const { username, password } = loginInput;
  const logininput = { username, password }
  console.log("logininput", logininput)
  return (dispatch) => {
    dispatch(fetchUsersRequest())

    fetch(`http://prodwebui-env-test-1.us-west-2.elasticbeanstalk.com/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        // alert(response.status)
        // response.data is the users
        const users = response
        console.log("users", users)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        console.log("error", error)
        // alert(error.message)
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  }
}
export const fetchUsersRequest = () => {
  return {
    type: LOGIN_START
  }
}

export const fetchUsersSuccess = users => {
  return {
    type: LOGIN_SUCCESS,
    payload: users
  }
}

export const fetchUsersFailure = error => {
  return {
    type: LOGIN_FAIL,
    payload: error
  }
}

