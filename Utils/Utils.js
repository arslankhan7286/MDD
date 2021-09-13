
import AsyncStorage from '@react-native-community/async-storage';




letauth_token ='';

constsetAuthorizationToken=async (token, user) => {​​​​​​​​
  try {​​​​​​​​
    awaitAsyncStorage.setItem('token', token);
    awaitAsyncStorage.setItem('user', JSON.stringify(user));
  }​​​​​​​​ catch (e) {​​​​​​​​
console.log('falied to save',e);
  }​​​​​​​​
}​​​​​​​​;
 
const getAuthorizationToken=async () => {​​​​​​​​
  try {​​​​​​​​
    consttoken = awaitAsyncStorage.getItem('token');
auth_token =token;
    returntoken;
  }​​​​​​​​ catch (e) {​​​​​​​​
console.log('falied to save',e);
  }​​​​​​​​
}​​​​​​​​;
// @param {*} token

 
const setAuthToken = token => {
  auth_token = token;
}

const getUser=async () => {​​​​​​​​
  try {​​​​​​​​
    constuser = {​​​​​​​​}​​​​​​​​;
    awaitAsyncStorage.getItem('user').then(user=> {​​​​​​​​
      if (user) {​​​​​​​​
        user =JSON.parse(user);
      }​​​​​​​​
    }​​​​​​​​);
    returnuser;
  }​​​​​​​​ catch (error) {​​​​​​​​
console.log(error);
  }​​​​​​​​
}​​​​​​​​;


