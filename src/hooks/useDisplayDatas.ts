import { ref, watch, Ref } from 'vue'
import { Products } from '@/hooks/useDataSources'
import type { DataItem } from '@/commons/types'

const basicDatas: DataItem[] = [
  { category: '期货', item: '品种1' },
  { category: '期货', item: '品种2' },
  { category: '期权', item: '品种5' },
  { category: '期货', item: '品种7' },
  { category: '期权', item: '品种8' },
  { category: '期权', item: '品种88' },
  { category: '期权', item: '品种87' },
  { category: '期权', item: '品种77' },
  { category: '期权', item: '品种76' },
  { category: '期权', item: '品种19' },
  { category: '期权', item: '品种20' },
  { category: '期权', item: '品种22' },
  { category: '期权', item: '品种888' },
  { category: '期权', item: '品种777' },
  { category: '期权', item: '品种999' },
  { category: '期权', item: '品种221' },
  { category: '期权', item: '品种112' },
  { category: '期权', item: '品种6578' },
  { category: '期权', item: '品' },
  { category: '期权', item: '品8' },
  { category: '期权', item: '种8' },
]

const deepDatas: DataItem[] = [
  { category: '期货', item: '深度种1' },
  { category: '期货', item: '深度品种3' },
  { category: '期权', item: '品种4' },
  { category: '期货', item: '深品种7' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深品种8' },
  { category: '期权', item: '深8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深品种8' },
  { category: '期权', item: '深种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
  { category: '期权', item: '深度品种8' },
]

const indexDatas: DataItem[] = [
  { category: 'none', item: '指数A' },
  { category: 'none', item: '指数B' },
  { category: 'none', item: '指数C' },
  { category: 'none', item: '指数D' },
]

const outsideDatas: DataItem[] = [
  { category: 'none', item: '标准仓单' },
  { category: 'none', item: '基差交易' },
  { category: 'none', item: '商品互换' },
  { category: 'none', item: '非标准仓单' },
  { category: 'none', item: '生猪' },
]

const dayDatas: DataItem[] = [
  { category: '期货', item: '日终品种1' },
  { category: '期货', item: '日终品种3' },
  { category: '期权', item: '日终品种4' },
  { category: '期货', item: '日终品种7' },
  { category: '期权', item: '日终品种8' },
]

const displayDatas = ref<DataItem[]>([])

export function useDisplayDatas(category: Ref<string>) {
  watch(
    () => category.value,
    (v) => {
      if (v == Products.Basic) {
        displayDatas.value = basicDatas
      } else if (v == Products.Deep) {
        displayDatas.value = deepDatas
      } else if (v == Products.Index) {
        displayDatas.value = indexDatas
      } else if (v == Products.Out) {
        displayDatas.value = outsideDatas
      } else if (v == Products.Day) {
        displayDatas.value = dayDatas
      }
    }
  )
  return { displayDatas }
}

export { displayDatas }
