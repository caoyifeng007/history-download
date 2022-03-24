import { useForm, useField, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import * as yup from 'yup'

export function useValidate() {
  // Define a validation schema
  const schema = yup.object({
    account: yup.string().required().min(10),
    password: yup.string().required(),
  })

  // Create a form context with the validation schema
  useForm({
    validationSchema: schema,
  })

  configure({
    generateMessage: localize({
      en: {
        names: {
          account: '席位号',
          password: '密码',
        },
      },
    }),
  })
  // Or update multiple languages
  localize({
    en: {
      fields: {
        account: {
          required: '席位号不能为空！',
          min: '席位号不能为空！',
        },
        password: {
          required: '密码不能为空！',
        },
      },
    },
  })

  // No need to define rules for fields
  const { value: account, errorMessage: accountError } = useField<string>('account')
  const { value: password, errorMessage: passwordError } = useField<string>('password')
  return { account, accountError, password, passwordError }
}
