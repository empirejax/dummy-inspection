import axios from 'axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:3000/', // Replace with the correct port your server is running on
});
