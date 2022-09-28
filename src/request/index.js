import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2500, // request timeout
  withCredentials: true
})

export default service
