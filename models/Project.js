const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  data: { columns: { type: Array }, tasks: { type: Array } },
})

module.exports = model('Project', schema)
