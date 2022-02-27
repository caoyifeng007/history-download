import { defineStore } from 'pinia'
import type { ILoginResp } from '@/request'
import { TimeLevels, Products, Categories } from '@/commons/enums'
import { dayOptions, minuteOptions, snapOptions } from '@/hooks/useDataSources'

export const useHqyStore = defineStore({
  id: 'hqy',
  state: () => ({
    timeLevel: '',
    date: '',
    rangePicker: false,
    product: '',
    category: '',
    selectedDatas: [] as string[],
    daylvFtr: {} as Record<string, number>,
    daylvOpt: {} as Record<string, number>,
    daylvIdx: {} as Record<string, number>,
    snaplvL1Ftr: {} as Record<string, number>,
    snaplvL1Opt: {} as Record<string, number>,
    snaplvL2Ftr: {} as Record<string, number>,
    snaplvL2Opt: {} as Record<string, number>,
    snaplvIdx: {} as Record<string, number>,
    snaplvOtc: {} as Record<string, number>,
    minlvL1Ftr: {} as Record<string, number>,
    minlvL1Opt: {} as Record<string, number>,
    minlvL2Ftr: {} as Record<string, number>,
    minlvL2Opt: {} as Record<string, number>,
    minlvIdx: {} as Record<string, number>,
  }),
  getters: {
    options(state) {
      if (state.timeLevel == TimeLevels.DayLevel) {
        return dayOptions
      } else if (state.timeLevel == TimeLevels.SnapLevel) {
        return snapOptions
      } else if (state.timeLevel == TimeLevels.MinuteLevel) {
        return minuteOptions
      }
    },
    selection(state) {
      if (state.product == Products.Index || state.product == Products.Out) {
        return state.timeLevel + state.product
      }
      return state.timeLevel + state.product + state.category
    },
    displayDatas(state) {
      switch (this.selection) {
        case TimeLevels.DayLevel + Products.Day + Categories.Ftr:
          return state.daylvFtr
        case TimeLevels.DayLevel + Products.Day + Categories.Opt:
          return state.daylvOpt
        case TimeLevels.DayLevel + Products.Index:
          return state.daylvIdx
        case TimeLevels.SnapLevel + Products.Basic + Categories.Ftr:
          return state.snaplvL1Ftr
        case TimeLevels.SnapLevel + Products.Basic + Categories.Opt:
          return state.snaplvL1Opt
        case TimeLevels.SnapLevel + Products.Deep + Categories.Ftr:
          return state.snaplvL2Ftr
        case TimeLevels.SnapLevel + Products.Deep + Categories.Opt:
          return state.snaplvL2Opt
        case TimeLevels.SnapLevel + Products.Index:
          return state.snaplvIdx
        case TimeLevels.SnapLevel + Products.Out:
          return state.snaplvOtc
        case TimeLevels.MinuteLevel + Products.Basic + Categories.Ftr:
          return state.minlvL1Ftr
        case TimeLevels.MinuteLevel + Products.Basic + Categories.Opt:
          return state.minlvL1Opt
        case TimeLevels.MinuteLevel + Products.Deep + Categories.Ftr:
          return state.minlvL2Ftr
        case TimeLevels.MinuteLevel + Products.Deep + Categories.Opt:
          return state.minlvL2Opt
        case TimeLevels.MinuteLevel + Products.Index:
          return state.minlvIdx
      }

      return ''
    },
  },
  actions: {
    displayDataInit(res: ILoginResp) {
      console.log(res)

      this.$patch((state) => {
        state.daylvFtr = res.data.respDaylvFtrMap
        state.daylvOpt = res.data.respDaylvOptMap
        state.daylvIdx = res.data.respDaylvIdxMap
        state.snaplvL1Ftr = res.data.respSnaplvL1FtrMap
        state.snaplvL1Opt = res.data.respSnaplvL1OptMap
        state.snaplvL2Ftr = res.data.respSnaplvL2FtrMap
        state.snaplvL2Opt = res.data.respSnaplvL2OptMap
        state.snaplvIdx = res.data.respSnaplvIdxMap
        state.snaplvOtc = res.data.respSnaplvOtcMap
        state.minlvL1Ftr = res.data.respMinlvL1FtrMap
        state.minlvL1Opt = res.data.respMinlvL1OptMap
        state.minlvL2Ftr = res.data.respMinlvL2FtrMap
        state.minlvL2Opt = res.data.respMinlvL2OptMap
        state.minlvIdx = res.data.respMinlvIdxMap
      })
    },
  },
})
