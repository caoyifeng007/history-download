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
    isIdxOrOutDatas: true,
    selectedFtrDatas: [] as string[],
    selectedOptDatas: [] as string[],
    selectedIdxDatas: [] as string[],
    selectedOtcDatas: [] as string[],
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
    displayFtrDatas: {} as Record<string, number>,
    displayOptDatas: {} as Record<string, number>,
    displayIdxDatas: {} as Record<string, number>,
    displayOtcDatas: {} as Record<string, number>,
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
        state.isIdxOrOutDatas = true
        return state.timeLevel + state.product
      } else if (
        state.product == Products.Day ||
        state.product == Products.Basic ||
        state.product == Products.Deep
      ) {
        state.isIdxOrOutDatas = false
        return state.timeLevel + state.product + state.category
      }
    },
    isFtrDatas(state) {
      switch (this.selection) {
        case TimeLevels.DayLevel + Products.Day + Categories.Ftr:
          state.displayFtrDatas = state.daylvFtr
          return true
        case TimeLevels.SnapLevel + Products.Basic + Categories.Ftr:
          state.displayFtrDatas = state.snaplvL1Ftr
          return true
        case TimeLevels.SnapLevel + Products.Deep + Categories.Ftr:
          state.displayFtrDatas = state.snaplvL2Ftr
          return true
        case TimeLevels.MinuteLevel + Products.Basic + Categories.Ftr:
          state.displayFtrDatas = state.minlvL1Ftr
          return true
        case TimeLevels.MinuteLevel + Products.Deep + Categories.Ftr:
          state.displayFtrDatas = state.minlvL2Ftr
          return true
      }

      return false
    },
    isIdxDatas(state) {
      switch (this.selection) {
        case TimeLevels.DayLevel + Products.Index:
          state.displayIdxDatas = state.daylvIdx
          return true
        case TimeLevels.SnapLevel + Products.Index:
          state.displayIdxDatas = state.snaplvIdx
          return true
        case TimeLevels.MinuteLevel + Products.Index:
          state.displayIdxDatas = state.minlvIdx
          return true
      }
      return false
    },
    isOptDatas(state) {
      switch (this.selection) {
        case TimeLevels.DayLevel + Products.Day + Categories.Opt:
          state.displayOptDatas = state.daylvOpt
          return true
        case TimeLevels.SnapLevel + Products.Basic + Categories.Opt:
          state.displayOptDatas = state.snaplvL1Opt
          return true
        case TimeLevels.SnapLevel + Products.Deep + Categories.Opt:
          state.displayOptDatas = state.snaplvL2Opt
          return true
        case TimeLevels.MinuteLevel + Products.Basic + Categories.Opt:
          state.displayOptDatas = state.minlvL1Ftr
          return true
        case TimeLevels.MinuteLevel + Products.Deep + Categories.Opt:
          state.displayOptDatas = state.minlvL2Opt
          return true
      }
      return false
    },
    isOtcDatas(state) {
      switch (this.selection) {
        case TimeLevels.SnapLevel + Products.Out:
          state.displayOtcDatas = state.snaplvOtc
          return true
      }
      return false
    },
  },
  actions: {
    displayDataInit(res: ILoginResp) {
      console.log('服务端返回数据: ', res)

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
