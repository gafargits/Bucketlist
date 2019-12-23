const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // date_created: {
  //   type: Date,
  //   default: Date.now
  // },
  // date_modified: {
  //   type: Date,
  //   default: Date.now
  // },
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = Items = mongoose.model('items', ItemsSchema);