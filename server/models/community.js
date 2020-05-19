import mongoose from 'mongoose'

const communitySchema = new mongoose.Schema({
  token: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  cnpj: {
    type: String
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
  stock: {
    money: Number,
    basicBaskets: Number,
    hygieneProducts: Number,
    ppe: Number
  },
  code: {
    type: String,
    required: true
  },
  financialDetails: {
    accountName: String,
    bank: String,
    agency: String,
    account: String,
    doc: String
  },
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

export default mongoose.model('Community', communitySchema)
