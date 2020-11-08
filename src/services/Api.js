import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://172.19.0.1:3333',
});

export default Api;
