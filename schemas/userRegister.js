import * as Yup from 'yup'

export const UserRegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Digite o nome da instituição'),
  cpf: Yup.string(),
  accept: Yup.boolean().required('É necessário aceitar os termos'),
  communityCode: Yup.string().required('Digite o código da sua comunidade'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Digite seu email'),
  emailConfirmation: Yup.string()
    .email('Formato de email inválido')
    .oneOf([Yup.ref('email'), null], 'Os emails não são iguais')
    .required('Digite sua senha'),
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
  occupation: Yup.string(),
  communityRelation: Yup.string(),
  urgencies: Yup.string(),
  specialNeeds: Yup.object().shape({
    value: Yup.bool(),
    description: Yup.string()
  }),
  controlledMedication: Yup.object().shape({
    value: Yup.bool(),
    description: Yup.string()
  })
})
