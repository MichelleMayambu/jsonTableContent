import axios from "axios";
axios.defaults.baseURL = " http://localhost:3004/";

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Anllow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
}
const api = {
    get: (url, payload) => {
      return new Promise(function (resolve, reject) {
        try {
          axios.get(url, payload).then((response) => {
            resolve(response.data);
          });
        } catch (error) {
          reject(error);
          alert(error);
        }
      });
    },
    post: (url, payload) => {
      return new Promise(function (resolve, reject) {
        try {
          axios.post(url, payload).then((response) => {
            resolve(response.data);
          });
        } catch (error) {
          reject(error);
          alert(error);
        }
      });
    },
    put: (url, payload) => {
      return new Promise(function (resolve, reject) {
        try {
          axios.put(url, payload).then((response) => {
            resolve(response.data);
          });
        } catch (error) {
          reject(error);
          alert(error);
        }
      });
    },
  };
  export default {
    api
  };