import { type AxiosRequestConfig } from 'axios'
import axios, { AxiosInstance } from 'axios'

import { getToken } from '@/util/auth'

interface SubscribeInfo {
  daylvFtr: string[]
  daylvOpt: string[]
  daylvIdx: string[]
  snaplvL1Ftr: string[]
  snaplvL1Opt: string[]
  snaplvL2Ftr: string[]
  snaplvL2Opt: string[]
  snaplvIdx: string[]
  snaplvOtc: string[]
  minlvL1Ftr: string[]
  minlvL1Opt: string[]
  minlvL2Ftr: string[]
  minlvL2Opt: string[]
  minlvIdx: string[]
}

interface BaseResp {
  validate: string
  error: string
}

type ILoginResp = BaseResp & {
  token: string
}

enum TimeLevels {
  SnapLevel = 'PS0001',
  MinuteLevel = 'PS0002',
  DayLevel = 'PS0003',
}

interface TimelvObj {
  FCode: TimeLevels
  FValue: string
}
type ITimelvResp = BaseResp & {
  timelvs: TimelvObj[]
}

enum Products {
  Basic = 'DCE_L1',
  Deep = 'DCE_L2',
  Day = 'DCE_DE',
  Index = 'DCE_IDX',
  Otc = 'DCE_OTC',
}

interface ProductObj {
  FCode: Products
  FValue: string
}

type IProductResp = BaseResp & {
  products: ProductObj[]
}

enum Item {
  C = 'C',
  A = 'A',
  L = 'L',
  I = 'I',
  m = 'm',
  y = 'y',
  jd = 'jd',
  pfsm01 = 'pfsm01',
  pfm002 = 'pfm002',
}

interface ItemObj {
  VarietyId: Item
  VarietyName: string
  VarietyType: number
}

type IItemResp = BaseResp & {
  items: {
    Total: number
    Data: ItemObj[]
  }
}

interface IDataResp {
  validate: string
  dUrl: string
  error: string
}

interface ILogin {
  accountid: string
  password: string
}
class HqyRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        if (getToken()) {
          config.headers!.Authorization = getToken()
        }
        config.url = '/v1' + config.url
        return config
      },
      (err) => {
        console.error(err)
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        return data
      },
      (err) => {
        console.error(err)
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
  // timeout: 1000,
})

export {
  type ILoginResp,
  type IDataResp,
  type ITimelvResp,
  type TimelvObj,
  type IProductResp,
  type ProductObj,
  type IItemResp,
  type ItemObj,
  TimeLevels,
  Products,
}
