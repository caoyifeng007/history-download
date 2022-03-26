import { watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import { object, string, boolean, array } from 'yup'
import { TimeLevels, Products } from '@/commons/enums'
import { hqyStore } from '@/main'

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
}

export function useDownloadValidate() {
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
  })

  const { values } = useForm<DownloadForm>({
    initialValues: {
      timeLevel: '',
      date: [],
      product: '',
      rangePicker: false,
    },
    validationSchema: downloadSchema,
  })

  watch(values, (newFormData) => {
    hqyStore.$patch((state) => {
      state.timeLevel = newFormData.timeLevel
      state.date = newFormData.date
      state.product = newFormData.product
      state.rangePicker = newFormData.rangePicker
    })
  })

  return { downloadSchema, values }
}

export type { DownloadForm }
