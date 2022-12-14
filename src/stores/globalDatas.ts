import { useLocalStorage } from '@vueuse/core'
import { type TimelvObj } from '@/request'

const localToken = useLocalStorage('token', '')

const datas = useLocalStorage('serverDatas', {
  daylvFtr: [] as string[],
  daylvOpt: [] as string[],
  daylvIdx: [] as string[],
  snaplvL1Ftr: [] as string[],
  snaplvL1Opt: [] as string[],
  snaplvL2Ftr: [] as string[],
  snaplvL2Opt: [] as string[],
  snaplvIdx: [] as string[],
  snaplvOtc: [] as string[],
  minlvL1Ftr: [] as string[],
  minlvL1Opt: [] as string[],
  minlvL2Ftr: [] as string[],
  minlvL2Opt: [] as string[],
  minlvIdx: [] as string[],
})

const timelvs = useLocalStorage<TimelvObj[]>('timelvs', [])

export { datas, localToken, timelvs }
