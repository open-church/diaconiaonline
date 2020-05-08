import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Digite seu email'),
  password: Yup.string()
    .required('Digite sua senha')
})

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Digite seu email')
})
