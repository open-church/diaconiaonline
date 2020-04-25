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

export const OCCUPATIONS = [
  { value: 'employed', label: 'Empregado' },
  { value: 'unemployed', label: 'Desempregado' },
  { value: 'retired', label: 'Aposentado' }
]

export const RELATIONS = [
  { value: 'member', label: 'Membro' },
  { value: 'visitor', label: 'Visitante' }
]

export const ESPECIALNEEDS = [
  { value: 'cego', label: 'Cego' },
  { value: 'cadeirante', label: 'Cadeirante' }
]
