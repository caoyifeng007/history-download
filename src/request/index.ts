import type { AxiosRequestConfig } from 'axios'
import axios, { AxiosInstance } from 'axios'

class HqyRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        config.url = '/v1' + config.url
        console.log(config.url)
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        return data
      },
      (err) => {
        return err
      }
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  post<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, config)
  }
}

export default new HqyRequest({
  // baseURL: process.env.VUE_APP_BASE_SERVER,
  timeout: 1000,
})

export interface ILogin {
  validate: string
}

export interface IData {
  validate: string
  durl: string
}
