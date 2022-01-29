import { ref, onMounted, watch } from 'vue'
import { selectedSource } from '@/hooks/useDataSources'

interface DataItem {
  futureType: string
  name: string
}
const basicDatas: DataItem[] = [
  { futureType: '期货', name: '品种1' },
  { futureType: '期货', name: '品种2' },
  { futureType: '期权', name: '品种5' },
  { futureType: '期货', name: '品种7' },
  { futureType: '期权', name: '品种8' },
  { futureType: '期权', name: '品种88' },
  { futureType: '期权', name: '品种87' },
  { futureType: '期权', name: '品种77' },
  { futureType: '期权', name: '品种76' },
  { futureType: '期权', name: '品种19' },
  { futureType: '期权', name: '品种20' },
  { futureType: '期权', name: '品种22' },
  { futureType: '期权', name: '品种888' },
  { futureType: '期权', name: '品种777' },
  { futureType: '期权', name: '品种999' },
  { futureType: '期权', name: '品种221' },
  { futureType: '期权', name: '品种112' },
  { futureType: '期权', name: '品种6578' },
  { futureType: '期权', name: '品' },
  { futureType: '期权', name: '品8' },
  { futureType: '期权', name: '种8' },
]

const deepDatas: DataItem[] = [
  { futureType: '期货', name: '深度种1' },
  { futureType: '期货', name: '深度品种3' },
  { futureType: '期权', name: '品种4' },
  { futureType: '期货', name: '深品种7' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深品种8' },
  { futureType: '期权', name: '深8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深品种8' },
  { futureType: '期权', name: '深种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
  { futureType: '期权', name: '深度品种8' },
]

// const indexDatas = ['指数A', '指数B', '指数C', '指数D']
const indexDatas: DataItem[] = [
  { futureType: 'none', name: '指数A' },
  { futureType: 'none', name: '指数B' },
  { futureType: 'none', name: '指数C' },
  { futureType: 'none', name: '指数D' },
]
// const outsideDatas = ['场外数据1', '场外数据2', '场外数据3', '场外数据4', '场外数据5']
const outsideDatas: DataItem[] = [
  { futureType: 'none', name: '标准仓单' },
  { futureType: 'none', name: '基差交易' },
  { futureType: 'none', name: '商品互换' },
  { futureType: 'none', name: '非标准仓单' },
  { futureType: 'none', name: '生猪' },
]
const dayDatas: DataItem[] = [
  { futureType: '期货', name: '日终品种1' },
  { futureType: '期货', name: '日终品种3' },
  { futureType: '期权', name: '日终品种4' },
  { futureType: '期货', name: '日终品种7' },
  { futureType: '期权', name: '日终品种8' },
]

const displayDatas = ref<DataItem[]>([])

const selectedDatas = ref<string[]>()

export function useDisplayDatas() {
  onMounted(() => {
    // categories.value = axIns.get('/categories')
    // displayDatas.value = dayDatas
  })

  watch(
    () => selectedSource.value,
    (v) => {
      if (v == 'basicInfo') {
        displayDatas.value = basicDatas
      } else if (v == 'deepInfo') {
        displayDatas.value = deepDatas
      } else if (v == 'indexInfo') {
        displayDatas.value = indexDatas
      } else if (v == 'outsideInfo') {
        displayDatas.value = outsideDatas
      } else if (v == 'dayInfo') {
        displayDatas.value = dayDatas
      }
    }
  )
  return { displayDatas, selectedDatas }
}

export { displayDatas }
