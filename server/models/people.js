import mongoose from 'mongoose'

import { communityRelations, occupations } from '../helpers/enums'

const peopleSchema = new mongoose.Schema({
  token: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  communityCode: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String
  },
  communityRelation: {
    type: String,
    enum: Object.values(communityRelations).map(({ name }) => name)
  },
  occupation: {
    type: String,
    enum: Object.values(occupations).map(({ name }) => name)
  },
  specialNeeds: {
    value: Boolean,
    description: String
  },
  controlledMedication: {
    value: Boolean,
    description: String
  },
  urgencies: {
    type: String
  },
  accept: {
    type: Boolean
  },
  phone: String,
  address: {
    city: String,
    complement: String,
    country: String,
    neighborhood: String,
    number: String,
    state: String,
    street: String,
    zipCode: String
  }
},
{
  timestamps: true
})

export default mongoose.model('People', peopleSchema)
