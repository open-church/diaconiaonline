import mongoose from 'mongoose'

import { categories, descriptions, recurrences } from '../helpers/enums'

const transactionSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  people: { type: mongoose.Schema.Types.ObjectId, ref: 'People' },
  category: {
    type: String,
    required: true,
    enum: Object.values(categories).map(({ name }) => name)
  },
  description: {
    type: String,
    required: true,
    enum: Object.values(descriptions).map(({ name }) => name)
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  recurrence: {
    type: Boolean,
    required: true,
    default: false
  },
  typeRecurrence: {
    type: String,
    default: null,
    enum: Object.values(recurrences).map(({ name }) => name)
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
},
{
  timestamps: true
})

export default mongoose.model('Transaction', transactionSchema)
