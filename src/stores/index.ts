import { defineStore } from 'pinia'

export const useHqyStore = defineStore({
  id: 'hqy',
  state: () => ({
    dataLevel: '',
    date: '',
    rangePicker: false,
    product: '',
    category: '',
    selectedDatas: [] as string[],
  }),
  getters: {},
  actions: {},
})
