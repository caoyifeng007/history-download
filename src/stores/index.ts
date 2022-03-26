import { defineStore, StateTree } from 'pinia'
import { TimeLevels, Products, Categories, ItemLists, ItemGroup } from '@/commons/enums'
import { dayOptions, minuteOptions, snapOptions } from '@/hooks/useDataSources'
import { datas } from '@/stores/globalDatas'

export type HqyStateTree = StateTree & {
  timeLevel: string
  date: string[]
  rangePicker: boolean
  product: string
  category: string
  displayFtrDatas: string[]
  displayOptDatas: string[]
  displayIdxDatas: string[]
  displayOtcDatas: string[]
}

export const useHqyStore = defineStore<string, HqyStateTree>({
  id: 'hqy',
  state: () => ({
    timeLevel: '',
    date: [],
    rangePicker: false,
    product: '',
    category: '',
    displayFtrDatas: [],
    displayOptDatas: [],
    displayIdxDatas: [],
    displayOtcDatas: [],
  }),
  getters: {
    isDay(state) {
      return state.timeLevel == TimeLevels.DayLevel
    },
    isSnap(state) {
      return state.timeLevel == TimeLevels.SnapLevel
    },
    isMin(state) {
      return state.timeLevel == TimeLevels.MinuteLevel
    },
    isDayProduct(state) {
      return state.product == Products.Day
    },
    isL1Product(state) {
      return state.product == Products.Basic
    },
    isL2Product(state) {
      return state.product == Products.Deep
    },
    isIdxProduct(state) {
      return state.product == Products.Index
    },
    isOtcProduct(state) {
      return state.product == Products.Otc
    },
    isFtr(state) {
      return state.category == Categories.Ftr
    },
    isOpt(state) {
      return state.category == Categories.Opt
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
            state.displayFtrDatas = datas.value.daylvFtr
            return ItemLists.DaylvFtr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.value.daylvOpt
            return ItemLists.DaylvOpt
          }
        } else if (this.isIdxProduct) {
          state.displayIdxDatas = datas.value.daylvIdx
          return ItemLists.DaylvIdx
        }
      } else if (this.isSnap) {
        if (this.isL1Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.value.snaplvL1Ftr
            return ItemLists.SnaplvL1Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.value.snaplvL1Opt
            return ItemLists.SnaplvL1Opt
          }
        } else if (this.isL2Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.value.snaplvL2Ftr
            return ItemLists.SnaplvL2Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.value.snaplvL2Opt
            return ItemLists.SnaplvL2Opt
          }
        } else if (this.isIdxProduct) {
          state.displayIdxDatas = datas.value.snaplvIdx
          return ItemLists.SnaplvIdx
        } else if (this.isOtcProduct) {
          state.displayOtcDatas = datas.value.snaplvOtc
          return ItemLists.SnaplvOtc
        }
      } else if (this.isMin) {
        if (this.isL1Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.value.minlvL1Ftr
            return ItemLists.MinlvL1Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.value.minlvL1Ftr
            return ItemLists.MinlvL1Opt
          }
        } else if (this.isL2Product) {
          if (this.isFtr) {
            state.displayFtrDatas = datas.value.minlvL2Ftr
            return ItemLists.MinlvL2Ftr
          } else if (this.isOpt) {
            state.displayOptDatas = datas.value.minlvL2Opt
            return ItemLists.MinlvL2Opt
          }
        } else if (this.isIdxProduct) {
          if (this.isIdxProduct) {
            state.displayIdxDatas = datas.value.minlvIdx
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
  actions: {},
})
