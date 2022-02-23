import { ref, watch, onMounted } from 'vue'
import { displayDatas } from '@/hooks/useDisplayDatas'

// import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores'
const mainStore = useHqyStore()
// const { dataLevel } = storeToRefs(mainStore)

export interface OptionItem {
  label: string
  value: string
}

const dayOptions: OptionItem[] = [
  {
    label: '日终行情',
    value: 'dayInfo',
  },
  {
    label: '指数数据',
    value: 'indexInfo',
  },
]
const minuteOptions: OptionItem[] = [
  {
    label: '基本行情',
    value: 'basicInfo',
  },
  {
    label: '深度行情',
    value: 'deepInfo',
  },
  {
    label: '指数数据',
    value: 'indexInfo',
  },
]
const snapOptions: OptionItem[] = [
  {
    label: '基本行情',
    value: 'basicInfo',
  },
  {
    label: '深度行情',
    value: 'deepInfo',
  },
  {
    label: '指数数据',
    value: 'indexInfo',
  },
  {
    label: '场外数据',
    value: 'outsideInfo',
  },
]

const selectedSource = ref('')
const options = ref<OptionItem[]>()

export function useDataSources() {
  onMounted(() => {
    // options.value = dayOptions
    // selectedSource.value = 'dayInfo'
  })

  watch(
    () => mainStore.dataLevel,
    (v) => {
      if (v == 'DayPicker') {
        options.value = dayOptions
        selectedSource.value = ''
        displayDatas.value = []
      } else if (v == 'MinutePicker') {
        options.value = minuteOptions
        selectedSource.value = ''
        displayDatas.value = []
      } else if (v == 'SnapPicker') {
        options.value = snapOptions
        selectedSource.value = ''
        displayDatas.value = []
      }
    }
  )

  return { selectedSource, options }
}

export { selectedSource }
