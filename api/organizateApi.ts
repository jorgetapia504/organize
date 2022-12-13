import axios from 'axios'

const organizateApi = axios.create({
  baseURL: '/api'
})

export default organizateApi