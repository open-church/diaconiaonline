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
    required: true,
    enum: Object.values(communityRelations).map(({ name }) => name)
  },
  occupation: {
    type: String,
    required: true,
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
