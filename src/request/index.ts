import axios from 'axios'

const instance = axios.create({
  //   baseURL: process.env.VUE_APP_BASE_SERVER,
  timeout: 1000,
})

export default instance
