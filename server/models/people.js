import mongoose from 'mongoose'

import { communityRelations, occupations } from '../helpers/enums'

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  communityRelation: {
    type: String,
    required: true,
    enum: Object.values(communityRelations).map(({ name }) => name)
  },
  occupation: {
    type: String,
    required: true,
    enum: Object.values(occupations).map(({ name }) => name)
  },
  specialNeeds: {
    value: String,
    description: [String]
  },
  controlledMedication: {
    value: String,
    description: [String]
  },
  urgencies: {
    type: [String]
  },
  phone: String,
  address: {
    street: String,
    complement: String,
    number: String,
    neighborhood: String,
    state: String,
    country: String,
    zipCode: String
  }
},
{
  timestamps: true
})

export default mongoose.model('People', peopleSchema)
