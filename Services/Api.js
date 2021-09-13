import { delay } from 'redux-saga/effects';
import axios from 'axios';


 
function service() {
  const getAllProducts = () => {
    return fetch(
      'https://jsonplaceholder.typicode.com/users',
      
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => e);
  };


  const LoginUserRequest = (payload) => {
    return axios.post('https://cakesplanet.com/test/public/api/customer/login?',payload)
    .then(function (response) {
      console.log("response",response);
    })
    .catch(function (error) {
      console.log("error",error);
    });
  };


  return {
    getAllProducts,
    LoginUserRequest

  };
}
 
const productsService = service();
 
export default productsService;


