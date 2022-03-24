import { useForm, useField } from 'vee-validate'
import { object, string } from 'yup'

export function useValidate() {
  const schema = object({
    account: string()
      .required('请输入席位号')
      .matches(/CS\d{8}/, { excludeEmptyString: true, message: '请输入正确的席位号' })
      .length(10, '请输入正确的席位号'),
    password: string().required('密码不能为空'),
  })

  const { handleSubmit } = useForm({
    validationSchema: schema,
  })

  const { value: account, errorMessage: accountError } = useField<string>('account')
  const { value: password, errorMessage: passwordError } = useField<string>('password')

  return { account, accountError, password, passwordError, handleSubmit }
}
