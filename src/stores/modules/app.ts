import { defineStore } from 'pinia'
import { Categories, ItemLists, ItemGroup } from '@/commons/enums'
import { dayOptions, minuteOptions, snapOptions } from '@/hooks/useDataSources'
import { datas } from '@/stores/globalDatas'
import { TimeLevels, Products, type ProductObj, type ItemObj } from '@/request'

export const useHqyStore = defineStore({
  id: 'hqy',
  state: () => ({
    timeLevel: '',
    date: [] as string[],
    rangePicker: false,
    selProd: '',
    products: [] as ProductObj[],
    category: 'ftr',
    disData1: [] as ItemObj[],
    disData2: [] as ItemObj[],
    selData1: [] as string[],
    selData2: [] as string[],
    displayFtrDatas: [] as string[],
    displayOptDatas: [] as string[],
    displayIdxDatas: [] as string[],
    displayOtcDatas: [] as string[],
    selectedFtrDatas: [] as string[],
    selectedOptDatas: [] as string[],
    selectedIdxDatas: [] as string[],
    selectedOtcDatas: [] as string[],
  }),
  getters: {
    isDay(state): boolean {
      return state.timeLevel == TimeLevels.DayLevel
    },
    isSnap(state): boolean {
      return state.timeLevel == TimeLevels.SnapLevel
    },
    isMin(state): boolean {
      return state.timeLevel == TimeLevels.MinuteLevel
    },
    isDayProduct(state): boolean {
      return state.selProd == Products.Day
    },
    isL1Product(state): boolean {
      return state.selProd == Products.Basic
    },
    isL2Product(state): boolean {
      return state.selProd == Products.Deep
    },
    isCategoryProd(): boolean {
      return this.isDayProduct || this.isL1Product || this.isL2Product
    },
    isIdxProduct(state): boolean {
      return state.selProd == Products.Index
    },
    isOtcProduct(state): boolean {
      return state.selProd == Products.Otc
    },
    isFtr(state): boolean {
      return state.category == Categories.Ftr
    },
    isOpt(state): boolean {
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
          // select data on load
          // state.selectedFtrDatas = datas.value.daylvFtr
          // state.selectedOptDatas = datas.value.daylvOpt
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

export const appStore = useHqyStore()
