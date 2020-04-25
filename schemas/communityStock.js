import * as Yup from 'yup'

export const CommunityStockSchema = Yup.object().shape({
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
