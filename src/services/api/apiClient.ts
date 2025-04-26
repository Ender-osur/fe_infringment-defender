import axios from 'axios'


export const apiMultiservice = axios.create({
  baseURL: 'http://localhost:3123/api/generation',
  timeout: 10000,
})
