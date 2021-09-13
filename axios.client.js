import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
    baseURL: `https://mzsdcsryd8.execute-api.us-east-1.amazonaws.com/v1`,

});
customAxios.interceptors.request.use(
    async (config) => {

        const token = await AsyncStorage.getItem('jwt')
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            const session = await Auth.currentSession();
        }
        return config;
    },
    (error) => Promise.reject(error)
);
customAxios.interceptors.response.use(response => new Promise(function (resolve, reject) {
    resolve(response);
}), error => {
    if (!error.response) {
        return new Promise(function (resolve, reject) {
            reject(error)
            console.log(error)
        })
    }
    if (error.response.status === '403') {
        console.log("logout")
    }
    else {
        return new Promise(function (resolve, reject) {
            reject(error)
        })
    }
}
)


export default customAxios;