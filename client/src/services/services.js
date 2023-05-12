import axios from 'axios';

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

  function getUserAccount() {
    return axios.get('/');
  }

  const registerUser = ({email, username, password}) => {
    return axios.post('/register', {
      email,
      username,
      password,
      userType: "client",
    })
  }

  const loginUser = ({email, password}) => {
    return axios.post('/login', {
      email,
      password,
    })
  }

  const logoutUser = () =>{
    return axios.get('/logout')
  }

  const addUser = async (data) =>{
    return await axios.post('/add_user', {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      data
    })
  }

  export {
    getUserAccount,
    registerUser,
    loginUser,
    logoutUser,
    addUser
  }