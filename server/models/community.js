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
    street: String,
    complement: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
    zipCode: Number
  }
},
{
  timestamps: true
})

export default mongoose.model('Community', communitySchema)
