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
    .oneOf([Yup.ref('email'), null], 'Os emails não são iguais')
    .required('Digite seu email'),
  password: Yup.string()
    .required('Digite sua senha'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não são iguais')
    .required('Digite sua senha'),
  address: Yup.object().shape({
    street: Yup.string(),
    complement: Yup.string(),
    number: Yup.string(),
    neighborhood: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    zipCode: Yup.string()
  }),
  stock: Yup.object().shape({
    money: Yup.number(),
    basicBaskets: Yup.number(),
    hygieneProducts: Yup.number(),
    ppe: Yup.number()
  }),
  financialDetails: Yup.object().shape({
    accountName: Yup.string(),
    basicBaskets: Yup.string(),
    bank: Yup.string(),
    agency: Yup.string(),
    account: Yup.string(),
    doc: Yup.string()
  })
})
