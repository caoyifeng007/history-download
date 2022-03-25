import { watch } from 'vue'
import type { Store } from 'pinia'
import { useForm, useField } from 'vee-validate'
import { object, string, boolean, array } from 'yup'
import type { HqyStateTree } from '@/stores'

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

  const { handleSubmit } = useForm<LoginForm>({
    validationSchema: loginSchema,
  })

  const { value: account, errorMessage: accountError } = useField<string>('account')
  const { value: password, errorMessage: passwordError } = useField<string>('password')

  return { account, accountError, password, passwordError, handleLoginSubmit: handleSubmit }
}

interface DownloadForm {
  timeLevel: string
  date: string[]
  product: string
  rangePicker: boolean
}

export function useDownloadValidate(store: Store<string, HqyStateTree>) {
  const downloadSchema = object({
    timeLevel: string().required('请选择时间维度'),
    date: array().required('请选择日期').min(1, '日期不能为空'),
    product: string().required('请选择产品类型'),
    rangePicker: boolean().required(),
  })

  const { handleSubmit, values } = useForm<DownloadForm>({
    initialValues: {
      timeLevel: '',
      date: [],
      product: '',
      rangePicker: false,
    },
    validationSchema: downloadSchema,
  })

  watch(values, (newFormData) => {
    store.$patch((state) => {
      state.timeLevel = newFormData.timeLevel
      state.date = newFormData.date
      state.product = newFormData.product
      state.rangePicker = newFormData.rangePicker
    })
  })

  return { values, handleDownloadSubmit: handleSubmit }
}

export type { DownloadForm }
