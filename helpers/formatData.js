import { occupations } from '../server/helpers/enums'

export const getOccupation = (value) => {
  const occupation = occupations.find(o => o.value === value)
  return occupation ? occupation.label : null
}
