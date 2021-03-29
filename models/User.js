const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  ownProjects: [{ type: Types.ObjectId, ref: 'Project' }],
})

module.exports = model('User', schema)
