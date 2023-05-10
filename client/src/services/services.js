import axios from 'axios';


  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

  function getUserAccount() {
    return axios.get('/');
  }

  export {
    getUserAccount
  }