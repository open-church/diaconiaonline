import * as Yup from 'yup'

export const CommunityRegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Digite o nome da instituição'),
  cnpj: Yup.string(),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Digite seu email'),
  emailConfirmation: Yup.string()
    .email('Formato de email inválido')
    .oneOf([Yup.ref('email'), null], 'Os emails não são iguais'),
  password: Yup.string()
    .required('Digite sua senha'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não são iguais'),
  address: Yup.object().shape({
    street: Yup.string(),
    complement: Yup.string(),
    number: Yup.string(),
    neighborhood: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    zipCode: Yup.string()
  })
})
