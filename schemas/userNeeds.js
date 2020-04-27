import * as Yup from 'yup'

export const CommunityStockSchema = Yup.object().shape({
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
