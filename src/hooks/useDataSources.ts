import { ref, watch, Ref } from 'vue'
import { displayDatas } from '@/hooks/useDisplayDatas'
import { TimeLevels, Products } from '@/commons/enums'
import type { OptionItem } from '@/commons/types'

const dayOptions: OptionItem[] = [
  {
    label: '日终行情',
    value: Products.Day,
  },
  {
    label: '指数数据',
    value: Products.Index,
  },
]
const minuteOptions: OptionItem[] = [
  {
    label: '基本行情',
    value: Products.Basic,
  },
  {
    label: '深度行情',
    value: Products.Deep,
  },
  {
    label: '指数数据',
    value: Products.Index,
  },
]
const snapOptions: OptionItem[] = [
  {
    label: '基本行情',
    value: Products.Basic,
  },
  {
    label: '深度行情',
    value: Products.Deep,
  },
  {
    label: '指数数据',
    value: Products.Index,
  },
  {
    label: '场外数据',
    value: Products.Out,
  },
]

const options = ref<OptionItem[]>()

export function useDataSources(dataLevel: Ref<string>, product: Ref<string>) {
  watch(
    () => dataLevel.value,
    (v) => {
      if (v == TimeLevels.DayLevel) {
        options.value = dayOptions
      } else if (v == TimeLevels.MinuteLevel) {
        options.value = minuteOptions
      } else if (v == TimeLevels.SnapLevel) {
        options.value = snapOptions
      }
      product.value = ''
      displayDatas.value = []
    }
  )

  return { options, Products }
}

export { Products }
