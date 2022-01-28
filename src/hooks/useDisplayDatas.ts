import { ref, onMounted, watch } from 'vue'
import { selectedSource } from '@/hooks/useDataSources'

interface DataItem {
  futureOption: string
  name: string
}
const basicDatas: DataItem[] = [
  { futureOption: '期货', name: '品种1' },
  { futureOption: '期货', name: '品种2' },
  { futureOption: '期权', name: '品种5' },
  { futureOption: '期货', name: '品种7' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
  { futureOption: '期权', name: '品种8' },
]

const deepDatas: DataItem[] = [
  { futureOption: '期货', name: '深度种1' },
  { futureOption: '期货', name: '深度品种3' },
  { futureOption: '期权', name: '品种4' },
  { futureOption: '期货', name: '深品种7' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深品种8' },
  { futureOption: '期权', name: '深8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深品种8' },
  { futureOption: '期权', name: '深种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
  { futureOption: '期权', name: '深度品种8' },
]

// const indexDatas = ['指数A', '指数B', '指数C', '指数D']
const indexDatas: DataItem[] = [
  { futureOption: 'none', name: '指数A' },
  { futureOption: 'none', name: '指数B' },
  { futureOption: 'none', name: '指数C' },
  { futureOption: 'none', name: '指数D' },
]
// const outsideDatas = ['场外数据1', '场外数据2', '场外数据3', '场外数据4', '场外数据5']
const outsideDatas: DataItem[] = [
  { futureOption: 'none', name: '标准仓单' },
  { futureOption: 'none', name: '基差交易' },
  { futureOption: 'none', name: '商品互换' },
  { futureOption: 'none', name: '非标准仓单' },
  { futureOption: 'none', name: '生猪' },
]
const dayDatas: DataItem[] = [
  { futureOption: '期货', name: '日终品种1' },
  { futureOption: '期货', name: '日终品种3' },
  { futureOption: '期权', name: '日终品种4' },
  { futureOption: '期货', name: '日终品种7' },
  { futureOption: '期权', name: '日终品种8' },
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
