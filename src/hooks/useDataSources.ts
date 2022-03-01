import { Products } from '@/commons/enums'
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
    value: Products.Otc,
  },
]

export { dayOptions, minuteOptions, snapOptions }
