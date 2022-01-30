import axios from 'axios';

let flag = false;
let msg = '';

const logIn = (email: any, password: any) => {
  axios
    .post('http://localhost:5000/api/signIn/login', {
      email,
      password,
    })
    .then((response) => {
      flag = true;
    })
    .catch(function (error) {
      if (error.response) {
        msg = error.response.data.message;
      } else if (error.request) {
        msg = error.request;
      } else {
        msg = error.message;
      }
      msg = error.config;
    });
};

export { logIn, flag, msg };
