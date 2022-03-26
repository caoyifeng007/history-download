import { watch } from 'vue'
import type { Store } from 'pinia'
import { useForm, useField } from 'vee-validate'
import { object, string, boolean, array } from 'yup'
import type { HqyStateTree } from '@/stores'
import { TimeLevels, Products } from '@/commons/enums'

interface LoginForm {
  account: string
  password: string
}

export function useLoginValidate() {
  const loginSchema = object({
    account: string()
      .required('请输入席位号')
      .matches(/CS\d{8}/, { excludeEmptyString: true, message: '请输入正确的席位号' })
      .length(10, '请输入正确的席位号'),
    password: string().required('密码不能为空'),
  })

  useForm<LoginForm>({
    validationSchema: loginSchema,
  })

  const { value: account, errorMessage: accountError } = useField<string>('account')
  const { value: password, errorMessage: passwordError } = useField<string>('password')

  return {
    loginSchema,
    account,
    accountError,
    password,
    passwordError,
  }
}

interface DownloadForm {
  timeLevel: string
  date: string[]
  product: string
  rangePicker: boolean
  items: string[]
}

export function useDownloadValidate(store: Store<string, HqyStateTree>) {
  const downloadSchema = object({
    timeLevel: string()
      .required('请选择时间维度')
      .oneOf([TimeLevels.DayLevel, TimeLevels.SnapLevel, TimeLevels.MinuteLevel]),
    date: array()
      .ensure()
      .required()
      .of(
        string()
          .required()
          .matches(/\d{4}-\d{2}-\d{2}/)
      )
      .min(1, '日期不能为空'),
    product: string()
      .required('请选择产品类型')
      .oneOf([Products.Day, Products.Basic, Products.Deep, Products.Index, Products.Otc]),
    rangePicker: boolean().required(),
    items: array().when('product', {
      is: (val: string) => val == Products.Day || val == Products.Basic || val == Products.Deep,
      then: (schema) => schema.min(2),
    }),
  })

  const { values } = useForm<DownloadForm>({
    initialValues: {
      timeLevel: '',
      date: [],
      product: '',
      rangePicker: false,
      items: [],
    },
    validationSchema: downloadSchema,
  })
  const { value: items, errorMessage: itemsError } = useField<string[]>('item')

  watch(values, (newFormData) => {
    store.$patch((state) => {
      state.timeLevel = newFormData.timeLevel
      state.date = newFormData.date
      state.product = newFormData.product
      state.rangePicker = newFormData.rangePicker
    })
  })

  return { downloadSchema, values, items }
}

export type { DownloadForm }
