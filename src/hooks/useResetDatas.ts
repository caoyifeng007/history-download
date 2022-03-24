import { localToken, datas } from '@/stores/globalDatas'

export function useResetDatas() {
  localToken.value = null
  datas.value = null
}
