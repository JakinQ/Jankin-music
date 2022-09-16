import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1500 // request timeout

})

export default service
