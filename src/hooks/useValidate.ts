import { useForm, useField } from 'vee-validate'
import { object, string, setLocale } from 'yup'

export function useValidate() {
  setLocale({
    string: {
      matches: '席位号不正确',
    },

    // use functions to generate an error object that includes the value from the schema
    // number: {
    //   min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
    //   max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
    // },
  })

  // Define a validation schema
  const schema = object({
    account: string().required().matches(/CS/).length(2),
    // .matches(/CS\d{8}/),
    password: string().required(),
  })

  // Create a form context with the validation schema
  useForm({
    validationSchema: schema,
  })

  // No need to define rules for fields
  const { value: account, errorMessage: accountError } = useField<string>('account')
  const { value: password, errorMessage: passwordError } = useField<string>('password')
  return { account, accountError, password, passwordError }
}
