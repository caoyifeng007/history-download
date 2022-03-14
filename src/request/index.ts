import type { AxiosRequestConfig } from 'axios'
import axios, { AxiosInstance } from 'axios'

interface subscribeInfo {
  respDaylvFtrMap: string[]
  respDaylvOptMap: string[]
  respDaylvIdxMap: string[]
  respSnaplvL1FtrMap: string[]
  respSnaplvL1OptMap: string[]
  respSnaplvL2FtrMap: string[]
  respSnaplvL2OptMap: string[]
  respSnaplvIdxMap: string[]
  respSnaplvOtcMap: string[]
  respMinlvL1FtrMap: string[]
  respMinlvL1OptMap: string[]
  respMinlvL2FtrMap: string[]
  respMinlvL2OptMap: string[]
  respMinlvIdxMap: string[]
}
interface ILoginResp {
  validate: string
  data: subscribeInfo
}

interface IDataResp {
  validate: string
  durl: string
}

interface ILogin {
  account: string
  password: string
}
class HqyRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        config.url = '/v1' + config.url
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

  post<T>(url: string, data: ILogin, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }
}

export default new HqyRequest({
  // baseURL: process.env.VUE_APP_BASE_SERVER,
  timeout: 1000,
})

export type { ILoginResp, IDataResp }
