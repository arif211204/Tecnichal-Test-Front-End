import axios from 'axios';

// sesuikan dengan port yang ada di Backend / server
export default axios.create({
  baseURL: "http://localhost:2700",
  // baseURL: process.env.REACT_APP_API,
  
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

// console.log( process.env.API,'REACT_APP_API');