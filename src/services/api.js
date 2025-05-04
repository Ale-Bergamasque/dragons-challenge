import axios from 'axios';

const api = () => {
  return axios.create({
    baseURL: 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export default api;