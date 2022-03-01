import { defineStore } from 'pinia'
import type { ILoginResp } from '@/request'
import { TimeLevels, Products, Categories, ItemLists, ItemGroup } from '@/commons/enums'
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
    isDay(state) {
      return state.timeLevel == TimeLevels.DayLevel ? true : false
    },
    isSnap(state) {
      return state.timeLevel == TimeLevels.SnapLevel ? true : false
    },
    isMin(state) {
      return state.timeLevel == TimeLevels.MinuteLevel ? true : false
    },
    isDayProduct(state) {
      return state.product == Products.Day ? true : false
    },
    isL1Product(state) {
      return state.product == Products.Basic ? true : false
    },
    isL2Product(state) {
      return state.product == Products.Deep ? true : false
    },
    isIdxProduct(state) {
      return state.product == Products.Index ? true : false
    },
    isOtcProduct(state) {
      return state.product == Products.Otc ? true : false
    },
    isFtr(state) {
      return state.category == Categories.Ftr ? true : false
    },
    isOpt(state) {
      return state.category == Categories.Opt ? true : false
    },
    options() {
      if (this.isDay) {
        return dayOptions
      } else if (this.isSnap) {
        return snapOptions
      } else if (this.isMin) {
        return minuteOptions
      }
    },
    syncDisplayDatas(state) {
      if (this.isDay) {
        if (this.isDayProduct) {
          if (this.isFtr) {
            state.displayFtrDatas = state.daylvFtr
            return ItemLists.DaylvFtr
          } else if (this.isOpt) {
            state.displayOptDatas = state.daylvOpt
            return ItemLists.DaylvOpt
          }
        } else if (this.isIdxProduct) {
          state.displayIdxDatas = state.daylvIdx
          return ItemLists.DaylvIdx
        }
      } else if (this.isSnap) {
        if (this.isL1Product) {
          if (this.isFtr) {
            state.displayFtrDatas = state.snaplvL1Ftr
            return ItemLists.SnaplvL1Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = state.snaplvL1Opt
            return ItemLists.SnaplvL1Opt
          }
        } else if (this.isL2Product) {
          if (this.isFtr) {
            state.displayFtrDatas = state.snaplvL2Ftr
            return ItemLists.SnaplvL2Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = state.snaplvL2Opt
            return ItemLists.SnaplvL2Opt
          }
        } else if (this.isIdxProduct) {
          state.displayIdxDatas = state.snaplvIdx
          return ItemLists.SnaplvIdx
        } else if (this.isOtcProduct) {
          state.displayOtcDatas = state.snaplvOtc
          return ItemLists.SnaplvOtc
        }
      } else if (this.isMin) {
        if (this.isL1Product) {
          if (this.isFtr) {
            state.displayFtrDatas = state.minlvL1Ftr
            return ItemLists.MinlvL1Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = state.minlvL1Ftr
            return ItemLists.MinlvL1Opt
          }
        } else if (this.isL2Product) {
          if (this.isFtr) {
            state.displayFtrDatas = state.minlvL2Ftr
            return ItemLists.MinlvL2Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = state.minlvL2Opt
            return ItemLists.MinlvL2Opt
          }
        } else if (this.isIdxProduct) {
          if (this.isIdxProduct) {
            state.displayIdxDatas = state.minlvIdx
            return ItemLists.MinlvIdx
          }
        }
      }
    },
    currentGroup() {
      switch (this.syncDisplayDatas) {
        case ItemLists.DaylvFtr:
        case ItemLists.SnaplvL1Ftr:
        case ItemLists.SnaplvL2Ftr:
        case ItemLists.MinlvL1Ftr:
        case ItemLists.MinlvL2Ftr:
          return ItemGroup.FtrItem
        case ItemLists.DaylvOpt:
        case ItemLists.SnaplvL1Opt:
        case ItemLists.SnaplvL2Opt:
        case ItemLists.MinlvL1Opt:
        case ItemLists.MinlvL2Opt:
          return ItemGroup.OptItem
        case ItemLists.DaylvIdx:
        case ItemLists.SnaplvIdx:
        case ItemLists.MinlvIdx:
          return ItemGroup.IdxItem
        case ItemLists.SnaplvOtc:
          return ItemGroup.OtcItem
        default:
          return ''
      }
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
