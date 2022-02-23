import { defineStore } from 'pinia'
import type { ILoginResp } from '@/request'

export const useHqyStore = defineStore({
  id: 'hqy',
  state: () => ({
    timeLevel: '',
    date: '',
    rangePicker: false,
    product: '',
    category: '',
    selectedDatas: [] as string[],
  }),
  getters: {},
  actions: {
    displayDataInit(res: ILoginResp) {
      console.log(res)

      // this.$patch((state) => {
      //   state.rangePicker = true
      // })
    },
  },
})
