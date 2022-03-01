import { defineStore } from 'pinia'
import type { ILoginResp } from '@/request'
import { TimeLevels, Products, Categories, ItemLists, ItemGroup } from '@/commons/enums'
import { dayOptions, minuteOptions, snapOptions } from '@/hooks/useDataSources'
import { datas } from '@/stores/serverDatas'

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
            state.displayFtrDatas = datas.daylvFtr
            return ItemLists.DaylvFtr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.daylvOpt
            return ItemLists.DaylvOpt
          }
        } else if (this.isIdxProduct) {
          state.displayIdxDatas = datas.daylvIdx
          return ItemLists.DaylvIdx
        }
      } else if (this.isSnap) {
        if (this.isL1Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.snaplvL1Ftr
            return ItemLists.SnaplvL1Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.snaplvL1Opt
            return ItemLists.SnaplvL1Opt
          }
        } else if (this.isL2Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.snaplvL2Ftr
            return ItemLists.SnaplvL2Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.snaplvL2Opt
            return ItemLists.SnaplvL2Opt
          }
        } else if (this.isIdxProduct) {
          state.displayIdxDatas = datas.snaplvIdx
          return ItemLists.SnaplvIdx
        } else if (this.isOtcProduct) {
          state.displayOtcDatas = datas.snaplvOtc
          return ItemLists.SnaplvOtc
        }
      } else if (this.isMin) {
        if (this.isL1Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.minlvL1Ftr
            return ItemLists.MinlvL1Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.minlvL1Ftr
            return ItemLists.MinlvL1Opt
          }
        } else if (this.isL2Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.minlvL2Ftr
            return ItemLists.MinlvL2Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.minlvL2Opt
            return ItemLists.MinlvL2Opt
          }
        } else if (this.isIdxProduct) {
          if (this.isIdxProduct) {
            state.displayIdxDatas = datas.minlvIdx
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

      this.$patch(() => {
        datas.daylvFtr = res.data.respDaylvFtrMap
        datas.daylvOpt = res.data.respDaylvOptMap
        datas.daylvIdx = res.data.respDaylvIdxMap
        datas.snaplvL1Ftr = res.data.respSnaplvL1FtrMap
        datas.snaplvL1Opt = res.data.respSnaplvL1OptMap
        datas.snaplvL2Ftr = res.data.respSnaplvL2FtrMap
        datas.snaplvL2Opt = res.data.respSnaplvL2OptMap
        datas.snaplvIdx = res.data.respSnaplvIdxMap
        datas.snaplvOtc = res.data.respSnaplvOtcMap
        datas.minlvL1Ftr = res.data.respMinlvL1FtrMap
        datas.minlvL1Opt = res.data.respMinlvL1OptMap
        datas.minlvL2Ftr = res.data.respMinlvL2FtrMap
        datas.minlvL2Opt = res.data.respMinlvL2OptMap
        datas.minlvIdx = res.data.respMinlvIdxMap
      })
    },
  },
})
