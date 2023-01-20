import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://187.32.160.197:3333'
})