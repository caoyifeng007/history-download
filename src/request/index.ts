import type { AxiosRequestConfig } from 'axios'
import axios, { AxiosInstance } from 'axios'

interface subscribeInfo {
  respDaylvFtrMap: { [x: string]: number }
  respDaylvOptMap: { [x: string]: number }
  respDaylvIdxMap: { [x: string]: number }
  respSnaplvL1FtrMap: { [x: string]: number }
  respSnaplvL1OptMap: { [x: string]: number }
  respSnaplvL2FtrMap: { [x: string]: number }
  respSnaplvL2OptMap: { [x: string]: number }
  respSnaplvIdxMap: { [x: string]: number }
  respSnaplvOtcMap: { [x: string]: number }
  respMinlvL1FtrMap: { [x: string]: number }
  respMinlvL1OptMap: { [x: string]: number }
  respMinlvL2FtrMap: { [x: string]: number }
  respMinlvL2OptMap: { [x: string]: number }
  respMinlvIdxMap: { [x: string]: number }
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
